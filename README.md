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

## CI → Docker Hub (ตั้งค่า Secrets & ทดสอบ)
เพิ่มคำอธิบายวิธีตั้งค่า GitHub Secrets และวิธีทดสอบ pipeline เพื่อ push Docker images ขึ้น Docker Hub

1) Required GitHub Secrets
	- `DOCKERHUB_USERNAME` — ชื่อผู้ใช้หรือชื่อองค์กรบน Docker Hub
	- `DOCKERHUB_TOKEN` — Docker Hub access token (แนะนำใช้ token)

	วิธีเพิ่ม: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

2) วิธีทดสอบ CI บน GitHub
	- Push หรือ merge โค้ดเข้า `main` → workflow จะรันอัตโนมัติ
	- เข้าแท็บ `Actions` ใน repo เพื่อดู log ของแต่ละ job

3) วิธีตรวจสอบว่า image ขึ้นที่ Docker Hub แล้ว
	- เปิด: `https://hub.docker.com/r/<DOCKERHUB_USERNAME>/cars-backend` และ `.../cars-frontend`
	- ตรวจดูหน้า `Tags` ว่ามี `latest` หรือ tag ที่เป็น commit SHA ปรากฏ

4) ทดสอบ local (ไม่ต้องรอ CI)
```bash
# รันทดสอบ backend
cd backend
npm install
npm test

# สร้างและ push images ทดสอบ (ต้อง docker login ก่อน)
docker build -t YOUR_DOCKERHUB_USER/cars-backend:local -f backend/Dockerfile ./backend
docker push YOUR_DOCKERHUB_USER/cars-backend:local

docker build -t YOUR_DOCKERHUB_USER/cars-frontend:local -f frontend/Dockerfile ./frontend
docker push YOUR_DOCKERHUB_USER/cars-frontend:local
```

หากต้องการให้ผมเปลี่ยนชื่อ image ใน workflow ให้ตรงกับ Docker Hub ของทีม กรุณาส่งชื่อ Docker Hub มาได้เลย
