# kit: the animation engine

A p5.js + p5.brush engine for hand-painted 2D animation, rendered in headless Chrome. Built on
[ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) by John Heibel (MIT, see [LICENSE](LICENSE)),
with a neutral sample puppet (Pip) and no scenes except a placeholder: **your agent writes the scenes.**
Steps for agents: [../AGENTS.md](../AGENTS.md). Rules and the full API: [ANIMATION_GUIDE.md](ANIMATION_GUIDE.md).

## Files
| path | what it is |
|---|---|
| `src/config.js` | `PROJECT`: duration, bpm, first downbeat (offset), song file |
| `src/lyrics.js` | `LY`: `[start, end, text]` per sung line (timing only, never shown) |
| `src/core.js`, `src/timeline.js` | painting, timing, camera, effects, `shots()`, `brushWipe()` |
| `src/puppet.js`, `src/sheets.js`, `src/acting.js` | sample rig (Pip), its model sheets, `pose()` tracks |
| `src/scenes/` | the scenes, one file per chapter, each with a `<script>` tag in `studio.html` |
| `assets/` | `pdoom.mp3` + `SONG_CREDITS.md`; your own song goes here too (git ignores other files) |
| `tools/` | `doctor`, `song_info` (tempo, downbeat, sections), `lyrics_from_srt`, `check_storyboard` |
| `studio.html` | open in Chrome to scrub (`?t=2.5` jumps to a time, `?loop=emotions` / `?loop=views` shows Pip's sheets) |
| `render.mjs` | headless renderer: sheets, strips, crops, stills, MP4 (all modes listed at its top) |

## Commands (run in this folder)
```bash
npm install && npm run doctor                     # set up and check
npm run preview                                    # out/preview.mp4: first 10 s with the song
npm run sheet                                      # out/check/sheet.jpg: 6 frames from the first 12 s
node render.mjs --sheet=0.5,1.5,2.5 --out=out/check/a.jpg      # frames at chosen times
node render.mjs --strip=2.0:2.5 --out=out/check/strip.jpg      # every frame of a moment
node render.mjs --clip --range=20:30 --out=out/check/part.mp4  # a stretch, with the song
npm run render                                     # full video: out/frames → out/final.mp4 (about 1 h on 8 GB)
```
Output is 1920×1080 at 24 fps. Flags for unusual machines: `--chrome=<path>`, `--soft-gl` (no GPU), `--workers=N`.
