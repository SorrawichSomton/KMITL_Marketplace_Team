# คู่มือวางไฟล์ตามลำดับ — KMITL Marketplace Team 5

**คำสั่งสำคัญ: Owner ลง Baseline ทั้งชุดครั้งเดียว แล้วเพื่อน Clone จาก GitHub. ไม่ต้องให้เพื่อนทั้ง 4 คนเอา ZIP ไปทับซ้ำ.**

## ขั้นตอน Owner

1. สำรอง Repo: `git status` ต้องรู้ว่าอะไรเปลี่ยน; commit/backup งานที่ยังไม่เสร็จก่อน
2. `git switch main` แล้ว `git pull --ff-only origin main`
3. `git switch -c feature/owner-integration`
4. แตก `KMITL_Team5_Integrated_Baseline.zip` แล้วคัดลอก **ไฟล์ข้างในโฟลเดอร์** ลง Repo `KMITL_Marketplace_Team` (อย่าลบ `.git`)
5. รัน Backend Tests และ Frontend Lint/Build บนเครื่อง; ถ้าไม่ผ่านให้แก้ก่อน
6. `git add .` (ตรวจ `git status` ว่าไม่มี .env/.db/node_modules) แล้ว `git commit -m "chore: integrate local demo team baseline"`
7. `git push -u origin feature/owner-integration`; เปิด PR เข้า `main`, ตรวจ CI แล้ว Merge
8. เพื่อนทั้ง 4 คน Clone main ล่าสุด และสร้าง Branch ของตัวเอง; ZIP รายคนเป็นโค้ดอ้างอิงที่ **อยู่ใน baseline แล้ว**

## แยกตามสมาชิก

### 01 Owner

**ตำแหน่งไฟล์ที่แก้ได้ / ดูแล**

- `backend/app/main.py`
- `backend/app/models.py`
- `backend/app/schemas.py`
- `backend/app/database.py`
- `backend/app/security.py`
- `backend/app/config.py`
- `backend/app/routers/ (thin wrappers)`
- `backend/app/core/`
- `frontend/app/page.tsx`
- `frontend/app/layout.tsx`
- `frontend/app/globals.css`
- `frontend/components/Navbar.tsx`
- `frontend/components/ui/`
- `frontend/components/theme-provider.tsx`
- `frontend/components/theme-toggle.tsx`
- `frontend/lib/api.ts`
- `scripts/`
- `.github/`

### 02 Accounts

**ตำแหน่งไฟล์ที่แก้ได้ / ดูแล**

- `backend/app/features/accounts/auth_router.py`
- `backend/app/features/accounts/users_router.py`
- `frontend/app/login/page.tsx`
- `frontend/app/profile/page.tsx`
- `frontend/features/accounts/`
- `backend/tests/accounts/`

### 03 Catalog

**ตำแหน่งไฟล์ที่แก้ได้ / ดูแล**

- `backend/app/features/catalog/router.py`
- `frontend/app/listings/[id]/page.tsx`
- `frontend/components/ListingCard.tsx`
- `frontend/features/catalog/`
- `backend/tests/catalog/`

### 04 Trading

**ตำแหน่งไฟล์ที่แก้ได้ / ดูแล**

- `backend/app/features/trading/router.py`
- `frontend/app/sell/page.tsx`
- `frontend/app/reservations/`
- `frontend/features/trading/`
- `backend/tests/trading/`

### 05 Community

**ตำแหน่งไฟล์ที่แก้ได้ / ดูแล**

- `backend/app/features/community/router.py`
- `frontend/app/messages/page.tsx`
- `frontend/app/notifications/page.tsx`
- `frontend/app/admin/page.tsx`
- `frontend/app/reviews/`
- `frontend/features/community/`
- `backend/tests/community/`

## Branch และคำสั่ง (ให้ทำเฉพาะของตัวเอง)

| สมาชิก | Branch |
|---|---|
| Owner | `feature/owner-integration` |
| Accounts | `feature/accounts-login` |
| Catalog | `feature/catalog-search` |
| Trading | `feature/trading-sell` |
| Community | `feature/community-chat` |

ก่อนเริ่ม Feature: `git switch main; git pull --ff-only origin main; git switch -c feature/ชื่อ-ของตัวเอง`

ทดสอบในเครื่องจาก Repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\START_BACKEND.ps1
```

และ Terminal ใหม่:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\START_FRONTEND.ps1
```

**อย่าเปิด OTP จำลองบนอินเทอร์เน็ต** Local Demo ต้อง bind ไปที่ 127.0.0.1 เท่านั้น

## API Router ownership

- `backend/app/routers/auth.py`, `users.py`, `listings.py`, `community.py` = Owner บริหาร wrapper / register
- Accounts เขียน endpoint ใน `backend/app/features/accounts/`
- Catalog ดูแล GET/ค้นหาสินค้า ใน `backend/app/features/catalog/router.py`
- Trading ดูแลสร้าง/แก้/จอง ใน `backend/app/features/trading/router.py`
- Community ดูแล Chat, Review, Notification ใน `backend/app/features/community/router.py`
- โค้ดฐานข้อมูลกลาง/Model/Schema อยู่ที่ Owner; ต้องสร้าง Issue ขอการเปลี่ยนเมื่ออยากเพิ่มฟิลด์

## ข้อจำกัดการพิสูจน์ผลงาน

Baseline นี้เป็นโค้ดเดิมที่ปรับโครงสร้างใหม่ ไม่ใช่งานที่เพื่อนแต่ละคนเขียนใหม่ เพื่อนควรพัฒนา เพิ่ม Tests ปรับปรุง Bug และ Commit ผลงานจริงของตัวเอง ไม่ควรคัดลอกไฟล์เดิมแล้วอ้างว่าเขียนเอง
