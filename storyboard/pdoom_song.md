# Song analysis: "I'm Upping My P(doom)" (kit/assets/pdoom.mp3)

- Length 156.65 s. Tempo **132.0 BPM**, no drift (checked in 15 s windows). Beat 0.4545 s, bar 1.818 s.
- First downbeat **1.099 s** (confirmed by the chorus entry at bar 12 = 22.92 s and section changes landing on bars).
- Bar n starts at `1.099 + 1.818 n`.

| bar | time | section | energy (rms x100) |
|---|---|---|---|
| 0–12 | 0–22.9 | Intro + Verse 1 (quiet, builds from 4 to 8) | 4–8 |
| 12–20 | 22.9–37.5 | Chorus 1 | ~10 |
| 20–28 | 37.5–52.0 | Verse 2 | ~10 |
| 28–32 | 52.0–59.3 | Pre (dip): "Sydney, please let me free" | ~8.5 |
| 32–38 | 59.3–70.2 | Chorus 2 | ~10.7 |
| 38–48 | 70.2–88.4 | Verse 3 (driving) | ~11.4 |
| 48–60 | 88.4–110.2 | Breakdown: "Gato" + soft Chorus 3 | ~6 |
| 60–67 | 110.2–122.9 | Build: transformers / Chinchilla / RLHF | ~12 |
| 67–75 | 122.9–137.5 | Final chorus | ~12.5 |
| 75–77 | 137.5–141.1 | Dip: "Was it all for show?" | ~8.6 |
| 77–84 | 141.1–153.8 | Instrumental climax (loudest) | ~14 |
| 84– | 153.8–156.65 | Tail / fade | 6 → 0 |

Biggest timbre changes (bar starts): 15.6, 22.9, 81.1, 86.6, 88.4, 97.5, 102.9, 137.5, 141.1, 153.8.
Lyric timing: `kit/src/lyrics.js` (from the original video's subtitles). `kit/tools/song_info.mjs` measures the same
tempo and beat grid (its downbeat guess lands two beats earlier, 0.206 s; this storyboard uses 1.099 s).
