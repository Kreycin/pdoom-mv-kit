# P(doom) MV kit: ให้ AI ทำ MV ให้ทั้งเพลง

ให้ AI coding agent ของคุณ (Claude Code, Codex, Gemini CLI, Cursor หรือตัวอื่น) วาด MV เพลง
**"I'm Upping My P(doom)"** เป็นแอนิเมชันลายพู่กันด้วยโค้ดล้วน แล้ว render เป็น MP4 พร้อมเพลงบนเครื่องคุณเอง.
คุณแค่วาง prompt แล้วดูงาน 3 ครั้ง. อยากทำเพลงตัวเองก็ได้: [docs/own-song.md](docs/own-song.md)

> **ต้นฉบับ** · MV: [I'm Upping My P(doom)](https://www.youtube.com/watch?v=8j-hR4fJywU) (OtherReality) · โค้ด:
> [JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo) · เพลง: osmarks (ทำด้วย Udio, 2024).
> ถ้าชอบชุดนี้ ฝากไปดู MV ต้นฉบับ และกดดาวให้ repo ต้นฉบับด้วยนะครับ ⭐

ชุดนี้มาจากคลิปช่อง YouTube **Kreycin** ที่ให้ AI 3 ค่าย (Claude Opus 5.5, Gemini 4 Argon, DeepSeek V4.1 Flash) ทำ MV
เพลงนี้จากสตอรี่บอร์ดเดียวกัน. คุณได้ชุดเดียวกับที่ AI ทั้ง 3 ได้: ตัววาด, สตอรี่บอร์ด, จังหวะเนื้อร้อง
และไฟล์เพลง (ตัวละครมนุษย์ในสตอรี่บอร์ดเป็นคนธรรมดา เปลี่ยนเป็นตัวของคุณเองได้). วิธีคิดเบื้องหลังเล่าไว้ในคลิป
[สอนทำหนังแอนิเมชันด้วย Claude](https://youtu.be/_g7sFMynQ3E) ([repo หนังเรื่องนั้น](https://github.com/Kreycin/ton-sea))

## ต้องมีอะไร
- AI coding agent ที่รันคำสั่งในเครื่องได้ **และเปิดดูรูปได้** (มันต้องดูภาพที่ตัวเองวาด)
- [Node.js](https://nodejs.org) 22.12+, [Google Chrome](https://www.google.com/chrome/), [ffmpeg](https://ffmpeg.org/download.html):
  ยังไม่มีก็ไม่เป็นไร agent จะบอกและช่วยลงให้ทีละตัว
- คอม RAM 8 GB ก็พอ

## ทำตาม 5 ขั้น
**ขั้น 1 · ตั้งโปรเจกต์.** สร้างโฟลเดอร์เปล่า เปิด agent ในโฟลเดอร์นั้น แล้ววาง prompt จาก [PROMPT.md](PROMPT.md).
ถ้ามันขออนุญาตรันคำสั่ง (`npm`, `node`, `ffmpeg`) อ่านแล้วกดอนุญาตได้เลย

**ขั้น 2 · เช็กเครื่อง (เบรก 1).** agent ติดตั้ง เช็กเครื่อง แล้วทำพรีวิว 10 วินาที `kit/out/preview.mp4`: ลูกบอลเด้ง
ตามเพลง. เปิดดู ถ้าภาพขยับและมีเสียง พิมพ์ **ผ่าน ไปต่อ**

**ขั้น 3 · ตัวละคร (เบรก 2).** agent วาด Doomie (AI ตัวเอก) คนที่ร้องเพลงถึงมัน และแขกรับเชิญ เป็น model sheet: ตัวละครยืนเรียง
หลายท่า. เช็กแค่ 3 อย่าง: หน้าตาเหมือนเดิมทุกท่าไหม, แขนขาครบไม่เกินไหม, ท่ายากๆ (ปั๊มลมใส่ตัวเอง, ขี่จรวด,
จับคนห้อยหน้าผา) ยังดูเป็นตัวเดิมไหม. ไม่ชอบก็บอกเป็นความรู้สึกได้เลย เช่น "Doomie ดูน่ากลัวไป"
มันแปลงเป็นสีกับเส้นให้เอง

**ขั้น 4 · บทแรก (เบรก 3).** agent วาดบทแรก (เปิดม่าน → แล็บ, 23 วินาที) แล้วส่งคลิปพร้อมเพลงมาให้ดู. ตรงนี้คือจุดตัดสิน
ว่าลุคกับจังหวะใช่ไหม. ผ่านแล้วมันทำอีก 8 บทต่อเองโดยไม่หยุดถาม

**ขั้น 5 · render.** ทั้งเพลง 3,760 เฟรม ราว 1 ชั่วโมงบนเครื่อง 8 GB ระหว่างรอไปทำอย่างอื่นได้.
เสร็จแล้วได้ `kit/out/final.mp4`

แชตเต็มหรือ agent หยุดกลางทาง: เปิดแชตใหม่ในโฟลเดอร์เดิม วาง prompt "ทำต่อ" ใน PROMPT.md งานไม่หาย
เพราะมันจดไว้ใน `kit/PROGRESS.md` ว่าทำถึงไหน. ไม่อยากหยุดดูเลย: ใช้ prompt แบบปล่อยยาวใน PROMPT.md.
อยากดูช่วงไหนก็ขอได้ตลอด เช่น "ขอดูวินาทีที่ 80 ถึง 90"

## ใช้เวลาเท่าไร
| ขั้น | เวลา |
|---|---|
| ตั้งโปรเจกต์ + พรีวิว 10 วิ | 5 นาที |
| agent วาดตัวละครและทุกฉาก | 1–1.5 ชม. (AI ทั้ง 3 ค่ายใช้ราวนี้ตอนเราทดสอบ 1 พ.ย. 2026; Claude Code + Sonnet ทำถึงจบบทแรก 32 นาที) ใช้ token เยอะ |
| render ทั้งเพลง | ราว 1 ชม. บน MacBook RAM 8 GB |

## ทำไมมันเวิร์ก
1. **ทุกเฟรมคำนวณจากเวลา.** ขอดูวินาทีไหน มันวาดเฟรมนั้นได้ทันที แก้แล้วดูซ้ำได้เร็ว
2. **AI ดูภาพทุกครั้งที่แก้.** มัน render ภาพเรียงทีละเฟรมมาดูเองก่อนบอกว่าเสร็จ
3. **หนึ่งท่อน = หนึ่งเหตุการณ์ ที่ส่งต่อช็อตถัดไป.** ทุกช็อตมีอะไรเกิด (ระเบิด ไล่งับ ตกเหว) และพาเข้าช็อตต่อไป
   (งับจนมืด, ซูมทะลุตา, ฟองแตก) ไม่ใช่ตัดเฉยๆ
4. **MV คือโชว์ ไม่ใช่ลิปซิงก์.** ไม่มีใครร้อง ไม่มีตัวหนังสือบนจอ เพลงพาท่าทาง
5. **มีไฟล์จดว่าทำถึงไหน.** แชตเต็มกี่รอบก็ทำต่อได้

## ในนี้มีอะไร
| ไฟล์ | คืออะไร |
|---|---|
| [PROMPT.md](PROMPT.md) | prompt ที่ต้องวาง (แบบหยุดให้ดู 3 ครั้ง, แบบปล่อยยาว, แบบทำต่อ) |
| [AGENTS.md](AGENTS.md) | ขั้นตอนที่ agent ทำตาม (CLAUDE.md, GEMINI.md ชี้มาที่ไฟล์นี้) |
| [storyboard/pdoom.md](storyboard/pdoom.md) | สตอรี่บอร์ด: ทุกช็อต ทุกวินาที · [pdoom_lyrics.md](storyboard/pdoom_lyrics.md) แต่ละท่อนล้อมีมอะไร |
| [docs/own-song.md](docs/own-song.md) | ทำ MV เพลงของคุณเอง |
| [kit/](kit/) | ตัววาดและตัว render (คำสั่งทั้งหมดอยู่ใน [kit/README.md](kit/README.md)) |

## เรื่องเพลง
ไฟล์เพลงอยู่ที่ `kit/assets/pdoom.mp3` เอามาจาก [repo ต้นฉบับ](https://github.com/JohnHeibel/PDoomVideo)
(เครดิตอยู่ข้างไฟล์: [SONG_CREDITS.md](kit/assets/SONG_CREDITS.md)). เพลงเป็นของ osmarks ไม่อยู่ใต้ license MIT ของ repo นี้.
จะลง MV ที่ทำได้ที่ไหน ใส่เครดิตด้านล่างในคำอธิบายด้วย

## Credits
- **MV ต้นฉบับ** "I'm Upping My P(doom)": https://www.youtube.com/watch?v=8j-hR4fJywU (OtherReality)
- **โค้ดต้นฉบับ** [JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo): ไฟล์เพลง, เนื้อเพลงพร้อมเวลา (`kit/src/lyrics.js`), ไอเดียสตอรี่บอร์ด
- **ตัววาด** [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) (MIT): `kit/` ต่อยอดจากตัวนี้
- **เพลงและเนื้อเพลง** "I'm Upping My P(doom)" โดย osmarks ทำด้วย Udio (2024) ไฟล์ `kit/assets/pdoom.mp3`
  และ `kit/src/lyrics.js` เอามาจาก
  [JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo) · ความหมายแต่ละท่อนจากผู้แต่ง:
  [osmarks' interpretation](https://docs.osmarks.net/hypha/p(doom)_song_objectively_correct_interpretation) ·
  คลิปปี 2024 ที่ repo ต้นฉบับอ้างถึง: https://www.youtube.com/watch?v=uEB5E67vcPA
- **ไลบรารี** [p5.js](https://p5js.org) (LGPL-2.1), [p5.brush](https://github.com/acamposuribe/p5.brush) โดย
  Alejandro Campos Uribe (MIT), [Puppeteer](https://pptr.dev) (Apache-2.0): ติดตั้งผ่าน npm ไม่ได้รวมไว้ใน repo
- **ชุดนี้** (สตอรี่บอร์ด, ขั้นตอน, เครื่องมือใน `kit/tools/`): Kreycin

license MIT ([LICENSE](LICENSE)) ครอบคลุมเฉพาะโค้ด ไม่รวมเพลง: เพลงและเนื้อเพลงเป็นของผู้แต่ง

---

## English

**Make the "I'm Upping My P(doom)" music video with your own AI coding agent.** Hand-painted 2D animation written as
code (p5.js + p5.brush), rendered to MP4 with the song on your machine. Works with Claude Code, Codex, Gemini CLI,
Cursor and any agent that can run commands and open images. Your own song: [docs/own-song.md](docs/own-song.md).

> **Originals:** the [original MV](https://www.youtube.com/watch?v=8j-hR4fJywU) (OtherReality) and its
> [source code](https://github.com/JohnHeibel/PDoomVideo); song by osmarks (made with Udio, 2024). If you like this
> kit, please watch the original and star its repo.

**How:** make an empty folder, open your agent there, paste the prompt from [PROMPT.md](PROMPT.md). The agent clones
this repo, follows [AGENTS.md](AGENTS.md) and stops three times for you to look: the 10 s preview (proves your machine
works), the character model sheet, and the first chapter with music. Reply "looks good, go on" or say what to change.
Then it builds the other chapters and renders `kit/out/final.mp4`.

**Needs:** Node.js 22.12+, Google Chrome, ffmpeg (the agent helps install missing ones), 8 GB of RAM.
**Time:** setup 5 min; scenes 1–1.5 h of agent work (many tokens); full render about 1 h on an 8 GB MacBook.
**The song** is included at `kit/assets/pdoom.mp3`: by osmarks, made with Udio (2024), taken from
[JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo) ([credits](kit/assets/SONG_CREDITS.md)). The MIT
[LICENSE](LICENSE) covers the code only; the song and lyrics belong to their author.
