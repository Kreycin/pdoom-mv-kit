# ทำ MV เพลงของคุณเอง

ชุดเดิม ขั้นตอนเดิม เปลี่ยนแค่เพลง เวลาเนื้อร้อง และสตอรี่บอร์ด. เพิ่มจุดเบรกก่อนเริ่มวาดอีก 1 ครั้ง (รวมเป็น 4)
เพราะสตอรี่บอร์ดคือที่ตัดสินว่า MV ของคุณจะออกมาเป็นยังไง

**ขั้น 1 · ใส่เพลง.** วางไฟล์ไว้ที่ `kit/assets/song.mp3` (mp3, wav, m4a ได้หมด). โฟลเดอร์นี้ git ไม่เก็บ เพลงจึงไม่หลุด
ขึ้น repo ของคุณ. **สิทธิ์:** ต้องมีสิทธิ์ใช้เพลงในวิดีโอ ถ้าจะลงสาธารณะยิ่งต้องมี: เพลงของคุณเอง, เพลงที่ license
อนุญาต หรือได้รับอนุญาตจากศิลปินเป็นลายลักษณ์อักษร. เพลงจาก AI (Suno, Udio, …) อ่านเงื่อนไขของแพ็กเกจที่ใช้ก่อน.
เพลงที่คนอื่นปล่อยแล้วอาจโดนบล็อกหรือเคลม

**ขั้น 2 · วาง prompt นี้** (ถ้ามีไฟล์เนื้อเพลงแบบมีเวลา `.lrc` / `.srt` วางไว้ใน `kit/assets/` ด้วย จะแม่นกว่า)
```text
ทำ MV เพลงของฉัน kit/assets/song.mp3 ด้วยชุดนี้ ทำตาม docs/own-song.md ส่วน "สำหรับ agent":
วัดเพลง จับเวลาเนื้อร้อง ร่างสตอรี่บอร์ด แล้วหยุดให้ฉันดูสตอรี่บอร์ดกับคลิปเช็กจังหวะก่อนวาดอะไร.
ฉันผ่านแล้วค่อยทำตาม AGENTS.md ตั้งแต่ขั้น 1 กับสตอรี่บอร์ดนั้น จนได้ kit/out/final.mp4
```
ถ้าอยากได้เรื่องแบบไหน บอกต่อท้ายได้เลย เช่น "ตัวเอกเป็นแมวส้มที่อยากเป็นนักบินอวกาศ"

**ขั้น 3 · เบรก 0: สตอรี่บอร์ด.** agent ส่ง 2 อย่างมาให้ดู
- คลิป 15 วิ ลูกบอลเด้ง: ฟังว่าลูกบอลตกตรงจังหวะเพลงไหม
- สตอรี่บอร์ด `storyboard/<ชื่อเพลง>.md`: เช็ก 3 อย่าง ตัวเอกคือใคร, ทุกท่อนมีเหตุการณ์ที่เห็นภาพไหม,
  ตอนจบรับกับตอนเปิดไหม. อยากแก้ตรงไหนบอกได้ หรือแก้ในไฟล์เองเลยก็ได้

**ขั้น 4 · ที่เหลือเหมือน P(doom).** เบรก 3 ครั้งเดิม (พรีวิว, ตัวละคร, บทแรก) แล้ว render

---

## สำหรับ agent (for the agent)

### Measure the song
```bash
cd kit
node tools/song_info.mjs assets/song.mp3 --out=../storyboard/<song>_song.md
```
It prints length, tempo and first downbeat, and writes a bar-by-bar loudness table (where sections change). Copy its
`PROJECT` line (it includes the audio path) into `kit/src/config.js`. The tempo is reliable; the downbeat can be
off by a beat or two. Render `node render.mjs --clip --range=0:15 --out=out/check/beat.mp4` (the placeholder ball lands
on every beat) and listen at the first chorus: if it starts mid-bar, move `offset` by one beat (60 / bpm s). Wrong tempo
(half or double)? Rerun with `--bpm=<the real one>`. `npm run doctor` checks the song length against `config.js`.

### Lyric timings into `kit/src/lyrics.js`
`LY` is a list of `[start, end, "text"]` in seconds, one per sung line, used for timing only and never shown. Sources,
best first: a synced lyrics file (`.lrc`, `.srt`, `.vtt`) from the human; speech recognition with
[whisper](https://github.com/openai/whisper) (`whisper assets/song.mp3 --model small --output_format srt --output_dir out`,
or [whisper.cpp](https://github.com/ggml-org/whisper.cpp); sung words confuse it, so fix the text and keep the times);
by ear with [Audacity](https://www.audacityteam.org) labels (File → Export → Labels). Then:
```bash
node tools/lyrics_from_srt.mjs <file> --out=src/lyrics.js     # .srt .vtt .lrc or Audacity labels; --shift=<s> to nudge
```
Spot-check three lines with `--clip --range` around them. Instrumental: `const LY = [];` and plan by bars.

### The storyboard
Copy `templates/storyboard.md` to `storyboard/<song>.md` and fill it in; `storyboard/pdoom.md` is a full example. The
song fixes the length, so plan every second of it. What makes it work:
- **A star:** the character the song is about. It performs every line; others react.
- **One row per sung line** with a concrete action (a verb: chomps, inflates, surfs, slams), plus rows for instrumental
  stretches. Something happens in every shot; about one set-piece per line.
- **"into next" on every row:** how the action carries across the cut (a chomp to black, a fall, a zoom through an eye,
  a bubble popping). No plain cuts; brush wipes only between chapters.
- **Sets, not cards:** one place per chapter that the camera travels through; repeated choruses come back to the same
  set and escalate.
- **A Cast table** with exact colours and the marks that make each character recognisable, and a palette per chapter.
- **No text on screen, no lip-sync, nobody sings,** the camera always moving, the ending rhyming with the opening.

```bash
node tools/check_storyboard.mjs ../storyboard/<song>.md   # times in order, "into next" filled, every lyric line covered
```
Then stop: show the human the storyboard and `out/check/beat.mp4` (check-in 0). After they pass it, follow
`AGENTS.md` from step 1 with this storyboard.

### Checklist
- [ ] Song in `kit/assets/`, the human has the right to use it
- [ ] `src/config.js` matches the song (`npm run doctor` all OK), beat clip checked by ear
- [ ] `src/lyrics.js` spot-checked
- [ ] `storyboard/<song>.md` passes `check_storyboard.mjs` and the human passed check-in 0
- [ ] AGENTS.md check-ins 1–3, then `out/final.mp4`: right length, 1920×1080, audio
- [ ] Credits for the song (and this kit's sources, README) in the video description
