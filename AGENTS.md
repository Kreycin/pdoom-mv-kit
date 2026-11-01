# Instructions for the AI agent

You are making a music video entirely in code: hand-painted 2D animation (p5.js + p5.brush) painted frame by frame in
headless Chrome and encoded to MP4 with the song. This file works for any coding agent (Claude Code, Codex, Gemini CLI,
Cursor, …). Follow the steps in order. Run every command inside `kit/`. Talk to the human in their language.

**Which video:** the prompt names a storyboard. Default: `storyboard/pdoom.md` ("I'm Upping My P(doom)"). For another
song, `docs/own-song.md` comes first and ends with a storyboard in `storyboard/`.

## Three check-ins with the human
Unless the prompt says not to stop, stop three times, and only these three:

| # | after | show (give the path; open it if you can) | ask, in plain words |
|---|---|---|---|
| 1 | step 2 | `kit/out/preview.mp4` | Does it play, move and have sound? |
| 2 | step 4 | the cast model sheets in `kit/out/check/` | Same face in every pose? Arms and legs complete, none extra? Do the hard poses still look like the same character? |
| 3 | chapter 1 of step 5 | `kit/out/check/c01.mp4` (the first chapter with the song) | Is this the look and the timing you want? |

- "Pass" / "go on": write `check-in N: passed` in `kit/PROGRESS.md` and continue.
- Feedback is often a feeling ("Doomie looks scary", "too dark"). Turn it into concrete changes (shape, colour, line,
  size, timing), say in one line what you changed, re-render and show it again.
- After check-in 3, finish everything on your own. Don't stop to ask about taste.

## Ground rules
- **Look at what you render.** You cannot judge animation from code. After every render, open the image or frames
  and actually look. If you cannot view images, tell the human at once.
- **Every frame is a pure function of time.** No state carried between frames (`kit/ANIMATION_GUIDE.md` explains).
- **Keep `kit/PROGRESS.md`:** one line per step or chapter (written / checked / fixed / check-in passed). If it already
  exists when you start, read it and continue from where it stops: an earlier session may have run out.
- **Heavy machine work.** Use `--workers=2` on an 8 GB machine, 4 or more on bigger ones. Run long renders in the
  background and read only the tail of their output.
- **Rights.** The song belongs to its creator (README, Credits). Don't add other people's code, images or footage.

## 1. Install and check (about 3 min)
```bash
cd kit
npm install
npm run doctor    # every line must say OK; a FAIL line prints the fix
```
A tool is missing (Node 22.12+, Chrome, ffmpeg): tell the human what to install, with the link, or install it if you
can. No Chrome found: `npm run doctor -- --chrome="<path to chrome>"` (then pass the same `--chrome=` to every
`render.mjs` call, or set `CHROME_PATH`). No GPU (some Linux servers, VMs): add `--soft-gl` the same way.

## 2. 10-second preview (1–2 min)
```bash
npm run preview   # out/preview.mp4: the first 10 s, with the song
ffprobe -v error -show_entries stream=codec_type,width,height:format=duration -of compact out/preview.mp4
```
Pass: a `video` stream at 1920×1080, an `audio` stream, duration about 10 s. Then `npm run sheet` and look at
`out/check/sheet.jpg`: the kit's placeholder (a ball bouncing on every beat). It proves the machine works, not your
video. **Check-in 1.**

## 3. Read before you draw (do not skip)
1. The storyboard, all of it: what happens and when is fixed there; how it looks and moves is yours.
2. `kit/ANIMATION_GUIDE.md`, all of it: the rules, the workflow, the engine API and the sample puppet Pip.
3. `kit/docs/emotions.jpg` and `kit/docs/views.jpg`: Pip's model sheets (a pattern for rigs, not the cast).
4. P(doom) only: `storyboard/pdoom_lyrics.md` (what each line refers to) and `storyboard/pdoom_song.md` (structure).

## 4. Cast first
- Build each character from the storyboard's Cast table as one function `name(x, y, u, opts)` in
  `kit/src/cast/<name>.js`, with the controls the acting needs (eyes, brows, mouth shapes, arms, squash, views). Use
  `src/puppet.js` as the pattern. The star (the character the song is about) gets the full rig.
- Add a `<script>` tag per cast file in `kit/studio.html`, after `acting.js` and before the scenes.
- Draw each as a model sheet loop (`LOOPS.<name>` in its file, see `src/sheets.js`): views, moods, and **the hardest
  poses the storyboard asks of that character**, so problems show up here and not in the middle of a scene. P(doom):
  Doomie pumping itself up with a bicycle pump, riding a rocket, Gato-Doomie holding the human by one hand over a
  cliff; the human dangling.
  `node render.mjs --loop=<name> --sheet=1 --cols=1 --w=1920 --out=out/check/<name>.jpg`
- Fix until every character reads at thumbnail size and keeps its identity marks in every view and mood.
  **Check-in 2.**

## 5. Scenes, one chapter at a time, in time order
- One file per storyboard chapter: `kit/src/scenes/cNN_<name>.js` (an IIFE ending in `shots([[t0, fn], ...])`). Add
  its `<script>` tag in `studio.html` in time order. Delete `src/scenes/example.js` and its tag when the first chapter
  exists. For P(doom), chapters 0 and 1 (curtain and lab, 0–22.92 s) count as chapter 1 here.
- Every shot does what its row says, including the **into next** column: the action carries across the cut.
- After each chapter, the review loop (times are seconds of the song):
  ```bash
  node render.mjs --sheet=t1,t2,...,t12 --cols=4 --w=480 --out=out/check/cNN.jpg   # about one frame per beat or two
  node render.mjs --strip=a:b --out=out/check/cNN_move.jpg                          # every frame of a key move or seam
  node render.mjs --sheet=t --crop=x,y,w,h --w=600 --out=out/check/cNN_face.jpg     # faces and hands at full size
  node render.mjs --clip --range=a:b --out=out/check/cNN.mp4                       # hits against the music
  ```
  Check: does every line read as a distinct action? Is the star big enough (about 40% of frame height when acting)?
  Is anything cropped, frozen, popping between frames or covered by a glow? Any text on screen? Does every seam carry
  into the next shot? Do hits land on beats? Fix, re-render only the changed times, look again.
- After chapter 1, also run `npm run preview` again (now it opens your video). **Check-in 3** with `out/check/c01.mp4`.
- The human may ask to see any stretch ("seconds 80 to 90"): `node render.mjs --clip --range=80:90 --out=out/check/ask.mp4`.
- Before the full render, check the shape of the whole film: a sheet with one frame every 4 s
  (`--sheet=2,6,10,…` up to the end, `--cols=8 --w=240`).

## 6. Full render (about 1 hour on an 8 GB laptop; 3,760 frames for P(doom))
```bash
npm run frames    # deletes old frames, paints every frame into out/frames (2 workers). Run it in the background.
npm run final     # out/final.mp4, encoded with the song from src/config.js
```
Interrupted? Continue without deleting what is done: `node render.mjs --frames --workers=2`, then `npm run final`.
Changed a scene after a full render? Start again with `npm run frames` (it deletes the old frames first).
On a big machine: `node render.mjs --frames --fresh --workers=6`.

## 7. Check the final and report
```bash
ffprobe -v error -show_entries stream=codec_type,width,height:format=duration -of compact out/final.mp4
ffmpeg -y -v error -i out/final.mp4 -vf "fps=1/4,scale=320:-1,tile=8x5" -frames:v 1 out/check/film.jpg
```
Pass: duration equals the song (±0.1 s), 1920×1080, an audio stream. Look at `out/check/film.jpg`. Report to the human:
where the video is, how long the render took, and anything in the storyboard you could not do.
Optional small copy for phones: `ffmpeg -i out/final.mp4 -vf scale=960:540 -c:v libx264 -crf 27 -c:a aac out/final_540p.mp4`.

## Craft notes (from making these MVs)
- **The star performs.** In an AI song the AI is the star: it does each line on the beat and gets the camera, the size
  and most of the pose keys. Others react. **Nobody sings; no lip-sync** (mouths only make expressions).
- **One acted beat per line**, 3–6 pose keys each (anticipation, action, reaction, settle) with `pose()` from
  `src/acting.js`. Take the words literally first, then twist them.
- **Something answers** every action, and **something happens in every shot**: a face only reacting is not a shot.
- **Camera always moves:** push, drift, whip or shake. Close-ups (zoom 2.3–3.7) for acting, wides for spectacle, a low
  angle for triumph. Before rendering, work out what the camera sees (W/zoom × H/zoom around its centre).
- **Timing:** a gesture needs at least 0.4 s to read, a reaction 0.3 s, a reveal 0.8 s.

## Gotchas
- `hash()` takes numbers only; for string keys use `boilSeed('key')`.
- The last shot registered runs to the end of the video: in a chapter's last shot compute `dur = tEnd - tStart` yourself.
- Raw p5 drawing (`rect`, `image`) inside a brush frame needs `flushBrush()` first, or layers come out in the wrong order.
- A glow on a face washes it out: keep light sources' bloom off the eyes.
- A render that times out loading the page means the machine is overloaded: fewer workers, close other apps.
- `[page] WebGL: INVALID_OPERATION: uniform1i …` in render output comes from p5.brush and is harmless.
