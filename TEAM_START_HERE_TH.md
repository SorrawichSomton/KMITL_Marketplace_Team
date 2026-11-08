# KMITL Marketplace — Team 5 integrated baseline

**ฐาน:** KMITL_Marketplace_Local_Demo_Ready_Fixed.zip (โค้ดเวอร์ชัน Local Demo)

โครงสร้างนี้ปรับจากโปรเจกต์เดิมให้แยกไฟล์ Backend Router ตาม Feature โดยคง URL API เดิม ใช้เพื่อพัฒนาในเครื่องเท่านั้น และ **ห้าม Deploy OTP จำลองขึ้นเว็บสาธารณะ**

## ทำตามลำดับ
1. Owner สำรอง Repo ปัจจุบันก่อน (`git status` และสร้าง tag หรือ ZIP Backup)
2. Owner แตก baseline ZIP นี้ แล้วคัดลอก **เนื้อหาข้างใน** ไปที่ Repo `KMITL_Marketplace_Team` (ไม่คัดลอก `.git` ของที่อื่น)
3. Owner รันทดสอบและ Commit ชื่อ `chore: establish integrated local baseline` เข้า branch `feature/owner-integration` แล้วเปิด PR เข้า `main`
4. หลัง Merge ทุกคน `git clone` Repo Team จาก main; **ห้ามนำ ZIP ของแต่ละคนไปทับ main พร้อมกัน**
5. สมาชิกอ่านไฟล์ใน `TEAM_PACKAGES/` เพื่อรู้ขอบเขตไฟล์ที่ตนดูแล (แยกแจกเป็น ZIP อื่นให้ด้วย) และค่อยพัฒนา Feature ของตนผ่าน Branch + Commit + PR
6. Owner รับผิดชอบไฟล์ wrapper `backend/app/routers/*.py`, database/models/schema, Navbar, หน้าแรก, Shared API Client

**คำเตือนสำหรับหลักฐานอาจารย์:** โค้ดที่ยกมาจาก Local Demo เป็น baseline เดิม ไม่ควรอ้างว่าเพื่อนเขียนเอง ให้เพื่อนมี Commit ของการปรับปรุง/ทดสอบ/ขยาย Feature ที่ทำจริงหลังจาก Clone

## รัน (Windows PowerShell เปิด Terminal ที่ Repo Root)

Terminal A: `powershell -ExecutionPolicy Bypass -File .\scripts\START_BACKEND.ps1`

Terminal B: `powershell -ExecutionPolicy Bypass -File .\scripts\START_FRONTEND.ps1`

เปิด `http://localhost:3000` และ `http://127.0.0.1:8000/health`

## สถานะทดสอบ
อ่าน `TEAM_VALIDATION.md` และ `docs/TEAM_FILES_TH.md` เพื่อดูผลการทดสอบจริงในสภาพแวดล้อมที่สร้างไฟล์ (การผ่าน tests ไม่รับประกันว่า UI ใช้ได้บนทุกเครื่อง)
