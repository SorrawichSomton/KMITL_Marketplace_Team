# แบ่งงาน 5 คน: ขอบเขตไฟล์ (File ownership)

| คน | Branch prefix | งานที่จะลงมือพัฒนา | โฟลเดอร์ที่แก้ได้เอง |
|---|---|---|---|
| เจ้าของ repo (คนที่ 5) | `feature/owner-*` | Architecture, UI Shell/หน้าแรก, Database & migrations, security policy, config, CI/CD, integration, documentationกลาง | `frontend/app/page.tsx`, `frontend/app/layout.tsx`, `frontend/app/globals.css`, `frontend/components/shell/`, `frontend/lib/`, `backend/app/main.py`, `backend/app/core/`, `backend/app/db/`, `scripts/`, `.github/`, `docs/`, root config และ dependencies |
| เพื่อน 1 | `feature/accounts-*` | Authentication, profile, OTP จริงในอนาคต | `frontend/app/login/`, `frontend/app/profile/`, `frontend/features/accounts/`, `backend/app/features/accounts/`, `backend/tests/accounts/` |
| เพื่อน 2 | `feature/catalog-*` | สินค้า หน้าแสดงรายละเอียด รายการ ค้นหา กรอง | `frontend/app/listings/`, `frontend/features/catalog/`, `backend/app/features/catalog/`, `backend/tests/catalog/` |
| เพื่อน 3 | `feature/trading-*` | ลงขาย แก้ไขประกาศ จองสินค้า และการซื้อขาย | `frontend/app/sell/`, `frontend/app/reservations/`, `frontend/features/trading/`, `backend/app/features/trading/`, `backend/tests/trading/` |
| เพื่อน 4 | `feature/community-*` | แชต รีวิว แจ้งเตือน | `frontend/app/messages/`, `frontend/app/reviews/`, `frontend/app/notifications/`, `frontend/features/community/`, `backend/app/features/community/`, `backend/tests/community/` |

**ข้อสำคัญ**
- ทุกคน Clone repo เดียวกัน จึงเห็นทุกไฟล์ แต่ **แก้เฉพาะพื้นที่ที่ได้รับมอบหมาย** เท่านั้น
- `main.py`, models/db กลาง, Navbar/RootLayout, `package.json`, `.env.example`, `requirements.txt`, GitHub CI และ `frontend/lib/api.ts` ให้เจ้าของ repo เป็นคนแก้/เชื่อมหลัง Review
- เมื่อ Feature ต้องการเพิ่มตาราง DB หรือ route / API Contract ใหม่: เปิด Issue → เจ้าของเพิ่ม/ยืนยัน Contract และ integration PR แยก **ก่อน** สมาชิกเริ่มพึ่งพา shared change
- ขอบเขต Login vs Sell: เพื่อน 1 เป็นเจ้าของ session/login, เพื่อน 3 ตรวจ auth ผ่าน API ที่ owner ประกาศ โดยไม่แตะไฟล์เพื่อน 1
- ขอบเขต Catalog vs Trading: เพื่อน 2 จัดการการอ่าน/ค้นหาสินค้า, เพื่อน 3 ทำ write/booking; เจ้าของ repo ตัดสิน model and endpoint contract กลาง
- ขอบเขต Review vs Trading: เพื่อน 4 ทำ review logic โดยอาศัยสถานะธุรกรรมที่ผ่าน API/Service Contract ไม่แก้ไฟล์ Trading
- ขอบเขตของมึงในฐานะ Owner เป็นงานจริง: Infrastructure, API integration, CI, security/config และหน้าหลัก ไม่ใช่แค่กด Merge
- ป้องกันการทับงานด้วย **Branch + PR + review + file-boundary check** แต่ไม่รับประกันว่าโค้ดที่รวมแล้วจะเข้ากัน: ต้องตรวจ API Contract และทดสอบร่วม
