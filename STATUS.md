# STATUS: pdoom-mv-kit

Public hand-off kit for the Kreycin clip where three AIs made the "I'm Upping My P(doom)" MV from one storyboard.
A viewer clones it, opens any AI coding agent, pastes PROMPT.md, and gets `kit/out/final.mp4`. Local git only:
not pushed, no GitHub repo yet.

## State (2026-11-01, v1)
- Docs (v2, modelled on the ton-sea how-to clip https://youtu.be/_g7sFMynQ3E): README in Thai = 5 steps with 3 human
  check-ins (10 s preview, cast model sheet, chapter 1 with music), 3-point checks, "why it works", time table, credits
  at the top and in full; short English section. PROMPT.md: Thai + English prompts (3 check-ins / no stops / resume)
  that clone the repo first. AGENTS.md: check-in table, hard poses in the model sheets, clip of any range on request
  (+ CLAUDE.md / GEMINI.md pointers). docs/own-song.md: Thai steps + check-in 0 (storyboard, beat clip), agent details
  in English below. templates/storyboard.md.
- Storyboard: `storyboard/pdoom.md` = the locked contest storyboard with contest-only wording removed (anchors kept,
  marked as useful for cutting MVs together); `pdoom_song.md` (structure), `pdoom_lyrics.md` (what each line refers to).
- Kit: contest kit v3 engine (ClaudeAnimationBase-derived, Pip sample puppet, placeholder scene) plus:
  - `render.mjs`: `--encode` takes the song from src/config.js, `--fresh` clears old frames, 120 s page-load timeout,
    more Chrome paths (Windows per-user, Chromium, snap, Edge).
  - `tools/doctor.mjs`, `song_info.mjs`
    (tempo exact on P(doom): 132 BPM; downbeat guess 2 beats off, printed with candidates), `lyrics_from_srt.mjs`
    (SRT/VTT/LRC/Audacity labels), `check_storyboard.mjs` (P(doom): 52 rows, 46 lines, OK).
  - npm scripts: doctor, preview, sheet, frames, final, render.
- Song: bundled at `kit/assets/pdoom.mp3` (channel owner 2026-11-01: "ใส่ใน repo"), same file as JohnHeibel/PDoomVideo
  (sha256 7cdd9e61…), credits in `kit/assets/SONG_CREDITS.md`; LICENSE/README: MIT covers code only. Other files in
  `kit/assets/` stay git-ignored (own songs).

## Verified (2026-11-01, this Mac: 8 GB, Node 26, ffmpeg 9, Chrome)
- Re-run after docs v2 (fresh clone of commit 2743990): setup 24 s, preview 93 s, 1920×1080 + audio, 10.00 s, −22.9 dB.
- Re-run with the bundled song (fresh clone, no download): song sha256 OK, doctor 8× OK, preview 16 s (warm Chrome),
  1920×1080 + audio, 10.00 s, −22.9 dB.
- After the neutral-human storyboard change: check_storyboard OK (52 rows, 46 lines); fresh clone → doctor OK →
  preview 24 s, 1920×1080 + audio, 10.00 s, −22.9 dB.
- Fresh `git clone` into a temp folder, AGENTS.md steps 1–2 only: `npm install` (2 s, warm npm cache) → `npm run doctor`
  all OK (6 s) → `npm run preview` 95 s
  (~300 ms/frame) → out/preview.mp4: 1920×1080 video + audio, 10.00 s, mean −22.9 dB (sound present).
- Placeholder scene now bounces on every beat for the whole song (it used to stop at 4 s).
- `check_storyboard.mjs` on storyboard/pdoom.md: OK. `song_info.mjs` on pdoom.mp3: 132 BPM, beat grid within 16 ms.
- `lyrics_from_srt.mjs` on sample SRT, VTT, LRC and Audacity label files: OK.
- Not tested: a full agent run from PROMPT.md (1–1.5 h; the contest runs used the same kit), Windows/Linux machines.

## Next
1. Decided by the channel owner 2026-11-01: song bundled; `kit/src/lyrics.js` (original lyrics + timings) stays, credited
   to osmarks and JohnHeibel/PDoomVideo; no channel mascot in the kit (the storyboard's human is a neutral person); repo name `Kreycin/pdoom-mv-kit` (the URL in
   PROMPT.md). Name approved, publishing not.
2. Before publishing: add the clip link and the channel link to README.
3. Optional: an `examples/` folder with one AI's contest scenes, so viewers can render a finished MV with no agent work.
4. Publishing (GitHub repo, push) only with the channel owner's OK.
