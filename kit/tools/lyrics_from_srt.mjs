// lyrics_from_srt.mjs: turns timed lyrics into src/lyrics.js (LY = [[start, end, "text"], ...]).
// Reads .srt or .vtt subtitles (e.g. from whisper), .lrc synced lyrics, or Audacity label exports (.txt: start, end, text
// separated by tabs). LRC has start times only: each line ends 0.1 s before the next one starts (6 s at most).
//   node tools/lyrics_from_srt.mjs <file> [--out=src/lyrics.js] [--shift=-0.05]
import { readFileSync, writeFileSync } from 'node:fs';

const args = Object.fromEntries(process.argv.slice(2).filter(a => a.startsWith('--')).map(a => { const [k, v] = a.slice(2).split('='); return [k, v ?? true]; }));
const file = process.argv.slice(2).find(a => !a.startsWith('--'));
if (!file) { console.error('usage: node tools/lyrics_from_srt.mjs <file.srt|.vtt|.lrc|.txt> [--out=src/lyrics.js] [--shift=s]'); process.exit(2); }
const src = readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r/g, ''), shift = +(args.shift || 0);
const sec = s => { const m = s.trim().replace(',', '.').split(':').map(Number); return m.reduce((a, v) => a * 60 + v, 0); };
const clean = s => s.replace(/<[^>]+>/g, '').replace(/\{[^}]+\}/g, '').replace(/\s+/g, ' ').trim();
let LY = [];

if (/\.lrc$/i.test(file)) {
  const rows = [];
  for (const line of src.split('\n')) {
    const stamps = [...line.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)], text = clean(line.replace(/\[[^\]]*\]/g, ''));
    for (const m of stamps) if (text) rows.push([+m[1] * 60 + +m[2], text]);
  }
  rows.sort((a, b) => a[0] - b[0]);
  LY = rows.map(([t, text], i) => [t, Math.min(t + 6, rows[i + 1] ? Math.max(t + .3, rows[i + 1][0] - .1) : t + 4), text]);
} else if (/-->/.test(src)) {   // SRT / VTT
  for (const block of src.split(/\n\s*\n/)) {
    const lines = block.split('\n'), i = lines.findIndex(l => l.includes('-->'));
    if (i < 0) continue;
    const [a, b] = lines[i].split('-->').map(s => sec(s.split(' ').filter(Boolean)[0]));
    const text = clean(lines.slice(i + 1).join(' '));
    if (text) LY.push([a, b, text]);
  }
} else {   // Audacity labels: start<TAB>end<TAB>text
  for (const line of src.split('\n')) {
    const [a, b, ...t] = line.split('\t');
    if (t.length && !isNaN(+a)) LY.push([+a, +b, clean(t.join(' '))]);
  }
}
if (!LY.length) { console.error(`no timed lines found in ${file}`); process.exit(1); }
const r2 = v => Math.round(Math.max(0, v + shift) * 100) / 100;
LY = LY.sort((a, b) => a[0] - b[0]).map(([a, b, t]) => [r2(a), r2(b), t]);
const out = args.out || 'src/lyrics.js';
writeFileSync(out, `// lyrics.js: [start, end, text] for each sung line, in seconds of the song. For timing and acting only: never show the words on screen.
// Made by tools/lyrics_from_srt.mjs from ${file.split(/[\\/]/).pop()}. Check a few lines by ear and fix by hand.
const LY = [
${LY.map(([a, b, t]) => `  [${a}, ${b}, ${JSON.stringify(t)}],`).join('\n')}
];
`);
console.log(`wrote ${out}: ${LY.length} lines, ${LY[0][0]}–${LY.at(-1)[1]} s`);
