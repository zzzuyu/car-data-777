# ระบบบันทึกข้อมูลรถยนต์ (Car Record System)

## 1. เทคโนโลยีที่ใช้ (Tech Stack)

### Backend
*   **Framework:** Express.js (Node.js)
*   **Architecture:** RESTful API
*   **Database:** PostgreSQL (หรือ MySQL) - ใช้สำหรับเก็บข้อมูลรถยนต์

### Frontend
*   **Framework:** Vue 3 + Vite
*   **Styling:** TailwindCSS + daisyUI (ช่วยให้พัฒนา UI ได้รวดเร็วและสวยงาม)
*   **State Management / HTTP:** Axios หรือ Fetch API สำหรับเชื่อมต่อกับ Backend

### Infrastructure & Deployment
*   **Containerization:** Docker + Docker Compose
*   *รายละเอียด:* มีการจัดทำ `Dockerfile` แยกสำหรับ Backend และ Frontend เพื่อความสะดวกในการรันระบบ

## 2. ฟีเจอร์หลักของระบบ (Core Features)

### การจัดการข้อมูล (CRUD Operations)
*   **เพิ่ม (Create):** สามารถเพิ่มข้อมูลรถคันใหม่เข้าสู่ระบบได้
*   **อ่าน/ค้นหา (Read/Search):** สามารถดูรายการรถยนต์ทั้งหมด และค้นหาข้อมูลตามเงื่อนไขได้
*   **แก้ไข (Update):** สามารถแก้ไขข้อมูลรถยนต์ที่มีอยู่ในระบบได้
*   **ลบ (Delete):** สามารถลบข้อมูลรถยนต์ออกจากระบบได้

### ระบบคัดกรองและค้นหา (Filtering)
ผู้ใช้สามารถคัดกรองข้อมูลรถได้จาก:
*   สี (Color)
*   ยี่ห้อ (Brand)
*   ปีที่ผลิต (Year)
*   ราคา (Price)
*   สถานะ (Status) เช่น ว่าง, ขายแล้ว, กำลังซ่อม

### การแสดงผล (Display)
*   **Card View:** แสดงข้อมูลรถเป็นรูปแบบการ์ด (เหมาะสำหรับดูรูปภาพหรือข้อมูลเบื้องต้น)
*   **Table View:** แสดงข้อมูลรถเป็นรูปแบบตาราง (เหมาะสำหรับดูข้อมูลจำนวนมากและเปรียบเทียบ)

## 3. การทำงานร่วมกัน (Collaboration)
*   **Version Control:** Git & GitHub
*   **Workflow:** มีการแบ่ง Branch สำหรับการทำงาน (เช่น `main`, `backend-dev`, `frontend-dev`) เพื่อให้ทีมงานทั้ง 2 คนสามารถทำงานร่วมกันได้อย่างมีประสิทธิภาพและลดปัญหา Code Conflict