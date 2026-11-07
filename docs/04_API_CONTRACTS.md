# API contracts / Integration rules (เจ้าของ Repo ดูแล)

**โครงสร้างเปล่า ยังไม่มี API จริงนอกจาก GET `/health`**. อย่าเดา field ของ user/listing/reservation หรือ DB schema จากภาพ UI.

ให้ตกลงต่อ Issue ก่อน implement:
- Accounts: request/verify OTP, session, profile; Auth ใช้ verified identity จริงเมื่อใช้ production; ห้ามแชร์ OTP จำลอง
- Catalog: GET catalog, filters, GET listing detail (read side)
- Trading: POST/PUT/DELETE listing, POST booking, state transition (write side)
- Community: conversations/messages/reviews/notifications ตามธุรกรรมที่ verified และ permission ถูกต้อง
- Owner: DB schema+ migrations, cross-domain authorization, router registration, `frontend/lib/api.ts`, CORS, deployment

เมื่อเลือก API แล้ว: เขียน method/path/headers/body/response/error codes และ auth requirement ใน Issue/PR; Owner อัปเดตเอกสารนี้ก่อนเชื่อมใน `backend/app/main.py` หรือหน้า Home. **อย่าให้แต่ละคนไปเพิ่ม route ใน main.py เอง**

ตัวอย่างสัญญา (ไม่ใช่ implementation):
`GET /api/catalog` -> รายการสินค้าสำหรับหน้า Home
`POST /api/trading/listings` -> ต้องมี user login; server ตรวจ ownership

แยก backend `app/features/<domain>/` และ frontend `features/<domain>/` ลด Merge Conflict แต่ **ไม่สามารถกำจัด Integration Conflict ได้ทั้งหมด** ต้องมี owner review ทุก PR
