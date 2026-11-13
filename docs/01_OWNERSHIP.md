# แบ่งงาน 5 คน: ขอบเขตไฟล์ (File ownership)

| คน | Branch prefix | งานที่จะลงมือพัฒนา | โฟลเดอร์ที่แก้ได้เอง |
|---|---|---|---|
| เจ้าของ repo (คนที่ 5) | `feature/owner-*` | Architecture, UI Shell/หน้าแรก, Database & migrations, security policy, config, CI/CD, integration, documentationกลาง | `frontend/app/page.tsx`, `frontend/app/layout.tsx`, `frontend/app/globals.css`, `frontend/components/shell/`, `frontend/lib/`, `backend/app/main.py`, `backend/app/core/`, `backend/app/db/`, `scripts/`, `.github/`, `docs/`, root config และ dependencies |
| เพื่อน 1 | `feature/accounts-*` | Authentication, profile, OTP จริงในอนาคต | `frontend/app/login/`, `frontend/app/profile/`, `frontend/features/accounts/`, `backend/app/features/accounts/`, `backend/tests/accounts/` |
| เพื่อน 2 | `feature/catalog-*` | สินค้า หน้าแสดงรายละเอียด รายการ ค้นหา กรอง | `frontend/app/listings/`, `frontend/features/catalog/`, `backend/app/features/catalog/`, `backend/tests/catalog/` |
| เพื่อน 3 | `feature/trading-*` | ลงขาย แก้ไขประกาศ จองสินค้า และการซื้อขาย | `frontend/app/sell/`, `frontend/app/reservations/`, `frontend/features/trading/`, `backend/app/features/trading/`, `backend/tests/trading/` |
| เพื่อน 4 | `feature/community-*` | แชต รีวิว แจ้งเตือน | `frontend/app/messages/`, `frontend/app/reviews/`, `frontend/app/notifications/`, `frontend/features/community/`, `backend/app/features/community/`, `backend/tests/community/` |


