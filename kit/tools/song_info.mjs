// song_info.mjs: measures a song for src/config.js and the storyboard: length, tempo, first downbeat, and the loudness
// of every bar (where the sections change). Needs only ffmpeg. The downbeat is a guess: check it by ear (see below).
//   node tools/song_info.mjs assets/song.mp3 [--bpm=128] [--out=../storyboard/<song>_song.md]
//   --bpm forces the tempo if the guess is half or double the real one.
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const args = Object.fromEntries(process.argv.slice(2).filter(a => a.startsWith('--')).map(a => { const [k, v] = a.slice(2).split('='); return [k, v ?? true]; }));
const file = process.argv.slice(2).find(a => !a.startsWith('--'));
if (!file) { console.error('usage: node tools/song_info.mjs <song file> [--bpm=N] [--out=file.md]'); process.exit(2); }

const SR = 22050, HOP = 256, N = 1024, FPS = SR / HOP;
const dec = spawnSync('ffmpeg', ['-v', 'error', '-i', file, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 30 });
if (dec.status !== 0) { console.error(String(dec.stderr)); process.exit(1); }
const x = new Float32Array(dec.stdout.buffer, dec.stdout.byteOffset, dec.stdout.length / 4), dur = x.length / SR;

// magnitude spectrum per hop (radix-2 FFT, Hann window)
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) { let b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } }
  for (let len = 2; len <= n; len <<= 1) {
    const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a);
    for (let i = 0; i < n; i += len) for (let j = 0, cr = 1, ci = 0; j < len / 2; j++) {
      const k = i + j + len / 2, tr = re[k] * cr - im[k] * ci, ti = re[k] * ci + im[k] * cr;
      re[k] = re[i + j] - tr; im[k] = im[i + j] - ti; re[i + j] += tr; im[i + j] += ti;
      [cr, ci] = [cr * wr - ci * wi, cr * wi + ci * wr];
    }
  }
}
const win = Float32Array.from({ length: N }, (_, i) => .5 - .5 * Math.cos(2 * Math.PI * i / N));
const frames = Math.floor((x.length - N) / HOP);
const BANDS = 16, flux = new Float32Array(frames), rms = new Float32Array(frames), band = new Float32Array(frames * BANDS);
let prev = new Float32Array(N / 2);
for (let f = 0; f < frames; f++) {
  const re = new Float32Array(N), im = new Float32Array(N); let e = 0;
  for (let i = 0; i < N; i++) { const v = x[f * HOP + i]; re[i] = v * win[i]; e += v * v; }
  rms[f] = Math.sqrt(e / N); fft(re, im);
  const mag = new Float32Array(N / 2);
  for (let k = 0; k < N / 2; k++) {
    mag[k] = Math.log1p(100 * Math.hypot(re[k], im[k]));
    flux[f] += Math.max(0, mag[k] - prev[k]);
    band[f * BANDS + Math.min(BANDS - 1, Math.floor(Math.log2(1 + k) / Math.log2(N / 2) * BANDS))] += mag[k];
  }
  prev = mag;
}
// onset strength: flux minus its local mean (0.5 s), rectified
const local = (a, w) => { const o = new Float32Array(a.length); let s = 0; for (let i = 0; i < a.length; i++) { s += a[i]; if (i >= w) s -= a[i - w]; o[i] = Math.max(0, a[i] - s / Math.min(i + 1, w)); } return o; };
const on = local(flux, Math.round(FPS / 2));
const at = (a, p) => { const i = Math.floor(p), k = p - i; return i + 1 < a.length ? a[i] * (1 - k) + a[i + 1] * k : 0; };

// tempo: autocorrelation scored at 1-4 periods, weighted toward ~120 BPM so half/double tempos lose
const maxLag = Math.ceil(FPS * 60 / 55), ac = new Float32Array(maxLag + 1);
for (let l = 1; l <= maxLag; l++) { let s = 0; for (let i = l; i < on.length; i++) s += on[i] * on[i - l]; ac[l] = s; }
let bpm = +args.bpm || 0;
if (!bpm) {
  let best = -1;
  for (let b = 60; b <= 200; b += .05) {
    const lag = FPS * 60 / b; let s = 0;
    for (let k = 1; k <= 4; k++) s += at(ac, lag * k) / k;
    s *= Math.exp(-.5 * (Math.log2(b / 120) / .9) ** 2);
    if (s > best) { best = s; bpm = b; }
  }
}
// refine tempo and beat phase together: the grid that lines up with the most onsets over the whole song (a 0.5 BPM
// error drifts a beat and more by the end of a 3-minute song, so the autocorrelation guess is not enough)
let phase = 0, bestPh = -1;
const grid = (b, ph) => { let s = 0; for (let p = ph; p < on.length; p += FPS * 60 / b) s += at(on, p); return s; };
for (let b = args.bpm ? bpm : bpm - 1.5; b <= bpm + (args.bpm ? 0 : 1.5) + 1e-9; b += .01) {
  const P = FPS * 60 / b;
  for (let ph = 0; ph < P; ph += .5) { const s = grid(b, ph); if (s > bestPh) { bestPh = s; phase = ph; var fine = b; } }
}
bpm = Math.round(fine * 100) / 100;
if (!args.bpm && Math.abs(bpm - Math.round(bpm)) < .15) {   // most produced songs sit on a whole BPM: snap if it fits as well
  const r = Math.round(bpm), P = FPS * 60 / r; let bs = -1, bp = 0;
  for (let ph = 0; ph < P; ph += .25) { const s = grid(r, ph); if (s > bs) { bs = s; bp = ph; } }
  if (bs > bestPh * .97) { bpm = r; phase = bp; }
}
const beat = 60 / bpm;
// downbeat: which of the 4 beats starts the bar. Sections (and so the sound) change on bar lines: for every beat,
// compare the timbre of the 4 beats after it with the 4 before it, and pick the beat-in-bar where the big changes fall.
const rmsAt = (t0, t1) => { let s = 0, n = 0; for (let f = Math.max(0, Math.floor(t0 * FPS)); f < Math.min(rms.length, t1 * FPS); f++) { s += rms[f]; n++; } return n ? s / n : 0; };
const timbre = (t0, t1) => { const v = new Float32Array(BANDS); let n = 0; for (let f = Math.max(0, Math.floor(t0 * FPS)); f < Math.min(frames, t1 * FPS); f++, n++) for (let b = 0; b < BANDS; b++) v[b] += band[f * BANDS + b]; return v.map(x => x / Math.max(1, n)); };
const first = phase / FPS, score = [0, 0, 0, 0];
for (let i = 8, t = first + 8 * beat; t < dur - 12 * beat; i++, t += beat) {   // skip the fade-in and fade-out
  const a = timbre(t - 4 * beat, t), b = timbre(t, t + 4 * beat);
  let d = 0; for (let k = 0; k < BANDS; k++) d += (b[k] - a[k]) ** 2;
  score[i % 4] += d * d;   // squared again: a few big section changes outweigh many small wobbles
}
let downbeat = first + score.indexOf(Math.max(...score)) * beat;
// the first downbeat after the music starts
const startT = (() => { const m = Math.max(...rms); for (let f = 0; f < rms.length; f++) if (rms[f] > m * .05) return f / FPS; return 0; })();
while (downbeat - 4 * beat >= startT - beat / 2) downbeat -= 4 * beat;
while (downbeat < 0) downbeat += 4 * beat;

const bar = 4 * beat, nBars = Math.ceil((dur - downbeat) / bar), r3 = v => Math.round(v * 1000) / 1000;
const rows = [], loud = [];
for (let n = 0; n < nBars; n++) loud.push(rmsAt(downbeat + n * bar, downbeat + (n + 1) * bar));
const top = Math.max(...loud) || 1;
for (let n = 0; n < nBars; n++) {
  const jump = n > 0 && Math.abs(loud[n] - loud[n - 1]) / top > .12;
  rows.push(`| ${n} | ${(downbeat + n * bar).toFixed(2)} | ${'█'.repeat(Math.round(loud[n] / top * 20)).padEnd(20, '·')} | ${jump ? 'change' : ''} |`);
}
const md = `# Song analysis: ${file.split('/').pop()}

- Length **${dur.toFixed(2)} s**. Tempo **${bpm} BPM** (beat ${beat.toFixed(4)} s, bar ${bar.toFixed(4)} s).
- First downbeat **${downbeat.toFixed(3)} s**, a guess: the beat grid is reliable, but which beat starts the bar can be
  off by one or two beats (other candidates: ${[1, 2, 3].map(j => (downbeat + j * beat).toFixed(3)).join(', ')} s). Bar n starts at \`${downbeat.toFixed(3)} + ${bar.toFixed(4)} n\`.
- For src/config.js: \`const PROJECT = { duration: ${dur.toFixed(2)}, bpm: ${bpm}, offset: ${r3(downbeat)}, audio: '${file}' };\`

Check the downbeat by ear: \`node render.mjs --clip --range=0:15 --out=out/check/beat.mp4\` with the example scene (its
ball lands on every beat). If the landings sit between the drum hits, the tempo or offset is off; if they land on the
hits but the bar feels shifted, add or subtract one beat (${beat.toFixed(4)} s) to the offset until the big changes
(chorus entries) start a bar.

Loudness per bar ("change" = a jump of more than 12% of the loudest bar: a likely section change)

| bar | starts (s) | loudness | |
|---|---|---|---|
${rows.join('\n')}
`;
if (args.out) { writeFileSync(args.out, md); console.log(`wrote ${args.out}`); }
console.log(md.split('\n').slice(0, 6).join('\n'));
