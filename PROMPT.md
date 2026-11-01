# Prompt ที่ต้องวาง

สร้างโฟลเดอร์เปล่า เปิด AI coding agent ในโฟลเดอร์นั้น (Claude Code, Codex, Gemini CLI, Cursor หรือตัวอื่นที่รันคำสั่ง
และเปิดดูรูปได้) แล้ววาง prompt แบบใดแบบหนึ่ง. clone repo นี้ไว้แล้วก็ได้: เปิด agent ในโฟลเดอร์ repo แล้ววางเหมือนกัน

## แบบ 1 · หยุดให้ดู 3 ครั้ง (แนะนำ)
```text
ทำ MV เพลง "I'm Upping My P(doom)" ให้หน่อย
1. ถ้าโฟลเดอร์นี้ยังไม่มีไฟล์ AGENTS.md ให้ clone https://github.com/Kreycin/pdoom-mv-kit แล้วทำงานในโฟลเดอร์นั้น
2. อ่าน AGENTS.md แล้วทำตามทีละขั้น
3. หยุดให้ฉันดู 3 ครั้งตามที่ AGENTS.md บอก: พรีวิว 10 วิ, model sheet ตัวละคร, บทแรกพร้อมเพลง
4. นอกจากนั้นทำเองจนได้ kit/out/final.mp4 ถามฉันเฉพาะตอนขาดโปรแกรม หรือมีเรื่องที่ฉันต้องตัดสิน
```
ที่จุดเบรก ดูแล้วพิมพ์ **ผ่าน ไปต่อ** หรือบอกสิ่งที่รู้สึกว่าไม่ใช่ เป็นภาษาธรรมดาได้เลย เช่น "หน้า Doomie ดูไม่ร่าเริง"

## แบบ 2 · ปล่อยยาว ไม่ต้องหยุด
```text
ทำ MV เพลง "I'm Upping My P(doom)" ให้หน่อย ถ้าโฟลเดอร์นี้ยังไม่มีไฟล์ AGENTS.md ให้ clone
https://github.com/Kreycin/pdoom-mv-kit แล้วทำงานในโฟลเดอร์นั้น. อ่าน AGENTS.md แล้วทำตามทีละขั้น ไม่ต้องหยุดให้ฉันดู:
ตรวจภาพเองทุกขั้นตามที่ AGENTS.md บอก แล้วทำจนได้ kit/out/final.mp4 ถามฉันเฉพาะตอนขาดโปรแกรม
```

## แบบ 3 · ทำต่อ (แชตเต็ม หรือ agent หยุดกลางทาง)
เปิดแชตใหม่ในโฟลเดอร์เดิม แล้ววาง:
```text
ทำ MV ต่อจากที่ค้างไว้: อ่าน AGENTS.md กับ kit/PROGRESS.md แล้วทำขั้นถัดไปที่ยังไม่เสร็จ
จนได้ kit/out/final.mp4 ถ้าค้างอยู่ที่จุดเบรก ส่งของให้ฉันดูอีกรอบ
```

## เคล็ดลับ
- agent จะรัน `npm`, `node`, `ffmpeg`, `ffprobe` หลายรอบ. ถ้ามันขออนุญาตทุกครั้ง อนุญาตคำสั่งพวกนี้ในโฟลเดอร์นี้ไปเลย
- อยากดูช่วงไหนก็ขอได้ตลอด เช่น "ขอดูวินาทีที่ 80 ถึง 90" มันทำคลิปสั้นพร้อมเสียงให้ใน 1–2 นาที
- จะทำเพลงของคุณเอง: [docs/own-song.md](docs/own-song.md) มี prompt ของมันเอง

---

## English
Make an empty folder, open your agent there and paste one prompt. (Already cloned? Open the agent in the repo folder.)

**1 · Three check-ins (recommended)**
```text
Make the music video for "I'm Upping My P(doom)".
1. If this folder has no AGENTS.md, clone https://github.com/Kreycin/pdoom-mv-kit and work inside it.
2. Read AGENTS.md and follow its steps in order.
3. Stop for me three times, as AGENTS.md says: the 10 s preview, the character model sheet, the first chapter with music.
4. Otherwise work on your own until kit/out/final.mp4 exists. Ask me only if a tool is missing or a choice is mine.
```
At each check-in reply "looks good, go on", or say in plain words what feels wrong.

**2 · No stops**
```text
Make the music video for "I'm Upping My P(doom)". If this folder has no AGENTS.md, clone
https://github.com/Kreycin/pdoom-mv-kit and work inside it. Read AGENTS.md and follow its steps without stopping for
me: check your own renders as it says, until kit/out/final.mp4 exists. Ask me only if a tool is missing.
```

**3 · Resume**
```text
Continue the music video: read AGENTS.md and kit/PROGRESS.md and do the next unfinished step until kit/out/final.mp4
exists. If you were at a check-in, show it to me again.
```
