# 🚗 ระบบบันทึกข้อมูลรถยนต์ (Car Record System)

ระบบจัดการข้อมูลรถยนต์แบบ Full-stack รองรับ CRUD, ค้นหา/คัดกรอง และแสดงผลทั้งแบบ Card และ Table

## Tech Stack
| ส่วน | เทคโนโลยี |
|------|-----------|
| Frontend | Vue 3 + Vite, TailwindCSS, daisyUI |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Infra | Docker & Docker Compose |
| CI/CD | GitHub Actions |

## วิธีรันโปรเจกต์

```bash
docker compose up --build -d
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/cars

## วิธีปิดระบบ

```bash
docker compose down
```

## โครงสร้างโปรเจกต์

```
├── backend/          # Express.js API
│   ├── routes/       # CRUD routes
│   ├── db.js         # PostgreSQL connection
│   ├── init.sql      # Database schema + seed data
│   └── Dockerfile
├── frontend/         # Vue 3 + Vite
│   ├── src/
│   │   ├── components/   # CarCard, CarTable
│   │   ├── App.vue       # Main view + filters
│   │   └── api.js        # Axios config
│   └── Dockerfile
├── .github/workflows/ci.yml   # CI Pipeline
└── docker-compose.yml
```

## CI/CD
ทุกครั้งที่ Push ขึ้น `main`, `frontend-dev`, `backend-dev` ระบบ GitHub Actions จะ:
1. ติดตั้ง Dependencies ทั้ง Frontend และ Backend
2. Build Frontend
3. ทดสอบ Docker Compose Build

## การแบ่ง Branch
| Branch | หน้าที่ |
|--------|---------|
| `main` | โค้ดหลักที่พร้อมใช้งาน |
| `backend-dev` | พัฒนาฝั่ง Backend |
| `frontend-dev` | พัฒนาฝั่ง Frontend |
