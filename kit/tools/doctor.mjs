// doctor.mjs: checks that this machine can render, and that the song matches src/config.js. Run it from kit/.
//   node tools/doctor.mjs [--chrome=<path>] [--soft-gl]   every check, ending with one real frame rendered in headless Chrome
//   (extra flags are passed to render.mjs)
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import vm from 'node:vm';

let bad = 0;
const ok = (pass, what, fix = '') => { console.log(`${pass ? 'OK  ' : 'FAIL'} ${what}${pass || !fix ? '' : `\n     → ${fix}`}`); if (!pass) bad++; return pass; };
const has = cmd => spawnSync(cmd, ['-version'], { encoding: 'utf8' }).status === 0;

const [maj, min] = process.versions.node.split('.').map(Number);
ok(maj > 22 || (maj === 22 && min >= 12), `Node ${process.versions.node} (need 22.12 or newer)`, 'install Node.js 22 LTS or newer from https://nodejs.org');
const pkgs = ok(existsSync('node_modules/p5') && existsSync('node_modules/p5.brush') && existsSync('node_modules/puppeteer-core'), 'npm packages installed', 'run: npm install');
ok(has('ffmpeg'), 'ffmpeg on PATH', 'install ffmpeg (macOS: brew install ffmpeg · Windows: winget install ffmpeg · Linux: apt install ffmpeg)');
const probe = has('ffprobe');
ok(probe, 'ffprobe on PATH', 'ffprobe ships with ffmpeg: reinstall ffmpeg');

let P = null;
try { P = vm.runInNewContext(readFileSync('src/config.js', 'utf8') + ';PROJECT'); } catch (e) { ok(false, 'src/config.js loads', e.message); }
if (P) {
  ok(P.duration > 0 && P.bpm > 0, `src/config.js: ${P.duration} s, ${P.bpm} BPM, first downbeat ${P.offset} s, audio ${P.audio || '(none)'}`);
  if (P.audio && ok(existsSync(P.audio), `song file ${P.audio}`, P.audio.endsWith('pdoom.mp3') ? 'it comes with this repo: git checkout -- assets/pdoom.mp3' : 'put your song there (docs/own-song.md)') && probe) {
    const d = +spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', P.audio], { encoding: 'utf8' }).stdout;
    ok(Math.abs(d - P.duration) < 0.1, `song is ${d.toFixed(2)} s, config says ${P.duration} s`, `set duration: ${d.toFixed(2)} in src/config.js`);
  }
}

if (pkgs) {   // the real test: Chrome starts, WebGL works, the page paints a frame
  console.log('rendering one test frame in headless Chrome…');
  rmSync('out/check/doctor.jpg', { force: true });
  const r = spawnSync('node', ['render.mjs', ...process.argv.slice(2), '--sheet=1', '--cols=1', '--w=480', '--out=out/check/doctor.jpg'], { encoding: 'utf8' });
  ok(r.status === 0 && existsSync('out/check/doctor.jpg') && !/page error/.test(r.stdout), 'headless Chrome renders a frame (out/check/doctor.jpg)',
    (r.stderr + r.stdout).trim().split('\n').slice(-3).join('\n     ') + '\n     → no Chrome found? pass --chrome=<path> to render.mjs or set CHROME_PATH; no GPU? add --soft-gl');
}
console.log(bad ? `\n${bad} problem(s): fix them and run again` : '\nall good: next, npm run preview');
process.exit(bad ? 1 : 0);
