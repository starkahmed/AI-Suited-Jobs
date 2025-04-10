# README.md

# AI-Suited-Jobs

An AI-powered job-matching platform that analyzes resumes and finds suitable jobs based on skills, experience, and preferences.

---

## 🌐 Live Project
**Frontend**: https://ai-suited-jobs.vercel.app  
**Backend**: Coming soon (FastAPI + REST API)

---

## 📁 Tech Stack

### Frontend:
- React (w/ TypeScript)
- Vite
- Tailwind CSS
- ShadCN UI
- React Router
- React Query

### Backend:
- FastAPI (Python)
- spaCy (For resume parsing)
- Pydantic (Data validation)
- Uvicorn (ASGI server)

---

## 🧩 Project Structure

### Frontend (inside `/frontend`):
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
└── vite.config.ts
```

### Backend (inside `/backend`):
```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── api_router.py
│   ├── core/
│   │   └── config.py
│   ├── models/
│   │   └── job.py
│   ├── schemas/
│   │   └── job.py
│   ├── services/
│   │   └── job_matcher.py
│   └── main.py
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🔮 Phase-wise Roadmap

### ✅ Phase 1 (MVP)
- [x] Frontend basic UI
- [x] Resume upload + parsing endpoint
- [x] Job matching engine (basic)
- [x] Save jobs API (mocked)
- [x] Dashboard & Saved jobs UI

### 🔜 Phase 2
- [ ] Filters (location, salary, experience)
- [ ] Favorites system
- [ ] MongoDB/PostgreSQL integration

### 🔮 Future Plans
- [ ] Auto-apply feature
- [ ] LinkedIn/Naukri scraping
- [ ] Email notifications
- [ ] User profile system
- [ ] Admin panel

---

## ✨ Credits
This project was initially scaffolded using **Lovable.dev** and enhanced manually by Ahmedraza Shaikh.
