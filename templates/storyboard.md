# LOCKED STORYBOARD: "<song title>" music video

**What happens and when is fixed here.** How it looks and moves (drawing, animation, camera, light, effects) is up to
the agent. Example of a finished one: `storyboard/pdoom.md`.

Song `kit/assets/<file>`, <length> s, <bpm> BPM. Lines and times: `kit/src/lyrics.js`. Bar n starts at
<offset> + <bar length>n s (one beat = <60 / bpm> s). Structure: `<song>_song.md` (from `tools/song_info.mjs`).

## The idea
<Two to four sentences. Who wants what, what grows or changes across the song, how it ends. The ending rhymes with the
opening (same place or motif, changed).>

## Hard rules
1. **Something happens in every shot.** A character does something, something breaks, transforms, chases, falls or
   explodes. No shot is just a face reacting.
2. **Nobody sings. No lip-sync.** The music drives motion, not mouths. Mouths only make expressions.
3. **No text on screen.** No lyrics, titles, logos, letters or digits on props. Big moments are painted shapes.
4. **Every shot carries into the next** as written in the "into next" column. Brush wipes only at chapter breaks.
5. **The camera always moves:** push, pan, tilt, whip, orbit, zoom-out or an on-beat shake in every shot.
6. **Sets, not cards.** Each chapter happens in one place and the camera travels through it. Repeated choruses return
   to the same set, bigger each time.
7. Hits land on the beat. Moves start on a downbeat or an off-beat.
8. <Your own: a growth ladder, a recurring prop, a hero shot to spend effort on, …>

## Cast
| Who | Look | Role |
|---|---|---|
| **<Star>** (the one the song is about) | <Silhouette, exact colours as hex, the identity marks that must show in every shot (eyes, a curl, a glow), how it moves> | <What it does across the song> |
| **<Second character>** | <…> | <How it reacts> |
| **<Extras>** | <…> | <…> |

## Look of the chapters
- **Palette arc:** <chapter 1 colours> → <…> → <last chapter, rhyming with the first>.
- <How emotions change, how big the star is in acting shots (about 40% of frame height), …>

---

## 0 · <Opening> (0–<t>) · <palette>
| t | lyric | shot | into next |
|---|---|---|---|
| 0.0–<t> | – | <What happens. Camera move.> | <How the action carries into the next shot> |

## 1 · <Chapter name> (<t0>–<t1>) · <palette>
| t | lyric | shot | into next |
|---|---|---|---|
| <a>–<b> | <sung line> | <The star does a concrete action on the beat; something answers; camera move.> | <A chomp to black / a fall / a zoom through an eye / a bubble pops / a door slams …> |
| <b>–<c> | <next line> | <…> | <…> |

<!-- One table per chapter. One row per sung line (src/lyrics.js), plus rows for instrumental stretches.
     Every row fills "into next" (never "–"), except the very last row of the video.
     Check: node tools/check_storyboard.mjs ../storyboard/<song>.md (run in kit/) -->

## <N> · <Ending> (<t>–<end>) · <palette>
| t | lyric | shot | into next |
|---|---|---|---|
| <a>–<end> | – | <The ending: rhymes with the opening. Black (or the opening image) by <end>.> | End |

## Left out on purpose
Lyrics, titles and credits on screen: add them in a video editor afterwards if you want them.
