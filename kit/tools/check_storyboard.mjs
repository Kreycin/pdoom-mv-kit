// check_storyboard.mjs: checks a storyboard against the rules before any scene is built.
//   node tools/check_storyboard.mjs ../storyboard/<song>.md
// Reads every markdown table whose first column is a time range ("12.0–14.5"). Checks: times in order and inside the
// song (src/config.js), every row has a filled "into next" cell (the last row of the video may be the end), and every
// sung line in src/lyrics.js falls inside some row.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const file = process.argv[2];
if (!file) { console.error('usage: node tools/check_storyboard.mjs <storyboard.md>'); process.exit(2); }
const ctx = vm.createContext({});
vm.runInContext(readFileSync('src/config.js', 'utf8') + ';globalThis.PROJECT = PROJECT;', ctx);
vm.runInContext(readFileSync('src/lyrics.js', 'utf8') + ';globalThis.LY = LY;', ctx);
const { PROJECT, LY } = ctx;

const rows = [];
let head = null;
for (const [n, line] of readFileSync(file, 'utf8').split('\n').entries()) {
  if (!line.trim().startsWith('|')) { head = null; continue; }
  const cells = line.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  if (!head) { head = cells.map(c => c.toLowerCase()); continue; }
  if (cells.every(c => /^:?-+:?$/.test(c))) continue;
  const m = cells[0].match(/^(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)$/);
  if (!m) continue;
  const into = head.findIndex(h => h.includes('into next'));
  rows.push({ n: n + 1, a: +m[1], b: +m[2], into: into < 0 ? null : cells[into] ?? '' });
}
const problems = [], warn = [];
if (!rows.length) problems.push('no storyboard rows found (tables need a first column like "12.0–14.5")');
rows.forEach((r, i) => {
  if (r.b <= r.a) problems.push(`line ${r.n}: ends before it starts (${r.a}–${r.b})`);
  if (i && r.a < rows[i - 1].a) problems.push(`line ${r.n}: starts before the row above it`);
  if (r.b > PROJECT.duration + .05) problems.push(`line ${r.n}: ends at ${r.b}, after the song (${PROJECT.duration} s)`);
  const last = i === rows.length - 1;
  if (r.into === null && !last) warn.push(`line ${r.n}: its table has no "into next" column`);
  else if (r.into !== null && !last && (!r.into || /^[–\-—]$/.test(r.into))) problems.push(`line ${r.n}: empty "into next": say how the action carries into the next shot`);
  if (i && r.a - rows[i - 1].b > 1) warn.push(`line ${r.n}: ${(r.a - rows[i - 1].b).toFixed(1)} s gap after the row above (fine if the shot above holds through it)`);
});
for (const [a, , text] of LY) if (!rows.some(r => a >= r.a - .3 && a < r.b)) problems.push(`lyric at ${a} s ("${text}") has no row`);
if (rows.length && rows[0].a > .5) warn.push(`the first row starts at ${rows[0].a} s: what is on screen before that?`);
if (rows.length && rows.at(-1).b < PROJECT.duration - .5) warn.push(`the last row ends at ${rows.at(-1).b} s, the song at ${PROJECT.duration} s`);
for (const w of warn) console.log('warn  ' + w);
for (const p of problems) console.log('FAIL  ' + p);
console.log(`${rows.length} rows, ${LY.length} lyric lines: ${problems.length ? problems.length + ' problem(s)' : 'OK'}`);
process.exit(problems.length ? 1 : 0);
