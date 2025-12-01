# PlanKeeper - Visual Project Structure

```
plan/
├── 📄 INDEX.md                          ← Project navigation guide
├── 📄 QUICKSTART.md                     ← START HERE! (Setup guide)
├── 📄 README.md                         ← Complete documentation
├── 📄 PROJECT_COMPLETION.md             ← Delivery summary
├── 📄 .gitignore                        ← Git ignore rules
├── 🐳 docker-compose.yml                ← Docker orchestration
│
├── 📁 frontend/                         (React + Vite + TailwindCSS)
│   ├── 📄 package.json                  ← Dependencies & scripts
│   ├── 📄 vite.config.js                ← Vite configuration
│   ├── 📄 tailwind.config.js            ← Tailwind theme
│   ├── 📄 postcss.config.js             ← PostCSS setup
│   ├── 📄 index.html                    ← HTML entry point
│   ├── 📄 Dockerfile                    ← Container config
│   ├── 📄 .env.example                  ← Environment template
│   │
│   └── 📁 src/
│       ├── 📄 main.jsx                  ← React entry point
│       ├── 📄 App.jsx                   ← Main component
│       ├── 📄 index.css                 ← Global styles
│       │
│       ├── 📁 components/               (React components)
│       │   ├── 📄 FloatingAddButton.jsx ← '+' button
│       │   ├── 📄 PlanModal.jsx         ← Create plan modal
│       │   ├── 📄 PlanCard.jsx          ← Plan card display
│       │   ├── 📄 TodoItem.jsx          ← Todo list item
│       │   ├── 📄 NoteItem.jsx          ← Note list item
│       │   └── 📄 PlansGrid.jsx         ← Grid layout
│       │
│       └── 📁 services/                 (API client)
│           └── 📄 api.js                ← Backend API calls
│
├── 📁 backend/                          (Node.js + Express)
│   ├── 📄 index.js                      ← Express server & API endpoints
│   ├── 📄 package.json                  ← Dependencies & scripts
│   ├── 📄 Dockerfile                    ← Container config
│   ├── 📄 .env.example                  ← Environment template
│   ├── 📄 schema.sql                    ← Database schema
│   └── 📄 seed.sql                      ← Sample data
│
└── 📁 .git/                             (When initialized)
    └── (Git history)
```

---

## 📊 What's Inside Each Directory

### Root Level (4 docs, 1 config)

- **INDEX.md** - Navigation guide
- **QUICKSTART.md** - Setup instructions
- **README.md** - Full documentation
- **PROJECT_COMPLETION.md** - Delivery summary
- **docker-compose.yml** - Docker services config

### Frontend (26 files)

**Configuration:**

- package.json, vite.config.js, tailwind.config.js, postcss.config.js
- Dockerfile, .env.example, index.html

**Source Code (src/):**

- main.jsx, App.jsx, index.css
- 6 React components in components/
- 1 API service in services/

### Backend (6 files)

**Source Code:**

- index.js (7.7 KB - full API server)
- package.json

**Database:**

- schema.sql (904 bytes - tables & indexes)
- seed.sql (663 bytes - sample data)

**Configuration:**

- Dockerfile, .env.example

---

## 🔗 Component Relationships

```
App.jsx (Main state management)
├── FloatingAddButton
│   └── onClick → opens modal
├── PlansGrid
│   ├── maps over plans
│   └── PlanCard (per plan)
│       ├── View Details button → opens modal
│       └── Delete button → deletes plan
└── PlanModal
    ├── Plan Title input
    ├── Todo input → TodoItem components
    ├── Note input → NoteItem components
    ├── Create button → POST /api/plans
    └── Cancel button → closes modal
```

---

## 📡 API Endpoint Map

```
Client (Frontend/React)
    ↓
Vite Dev Server (5173) / Production Server
    ↓
Express Backend (4000)
    ├── GET /api/plans
    ├── GET /api/plans/:id
    ├── POST /api/plans
    ├── DELETE /api/plans/:id
    └── PUT /api/plans/:id
        ↓
PostgreSQL Database (3000)
    ├── plans table
    ├── todos table (FK → plans)
    └── notes table (FK → plans)
```

---

## 🗂️ File Purposes at a Glance

| File               | Purpose                         | Size   |
| ------------------ | ------------------------------- | ------ |
| App.jsx            | State management, data fetching | 3.1 KB |
| PlanModal.jsx      | Create plan form component      | 6.0 KB |
| api.js             | API client for backend          | 1.4 KB |
| index.js (backend) | Express server + endpoints      | 7.7 KB |
| schema.sql         | Database table definitions      | 0.9 KB |
| docker-compose.yml | Multi-service orchestration     | 1.4 KB |
| README.md          | Complete documentation          | 9.3 KB |
| QUICKSTART.md      | Setup instructions              | 9.6 KB |

---

## 🚀 Typical User Journey

1. **User opens app** (localhost:5173)
   ↓
2. **App loads** → App.jsx fetches plans from backend
   ↓
3. **Backend queries** → database returns plans
   ↓
4. **Plans displayed** as PlansGrid → PlanCard components
   ↓
5. **User clicks '+' button** → FloatingAddButton opens PlanModal
   ↓
6. **User adds todos/notes** → rendered as TodoItem/NoteItem
   ↓
7. **User clicks Create** → POST /api/plans
   ↓
8. **Backend validates** → inserts into database
   ↓
9. **Plan returned** → UI updates with new plan card

---

## 🔄 Data Flow

### Creating a Plan

```
User Input (Modal)
    ↓
PlanModal.jsx validates
    ↓
api.js → POST /api/plans
    ↓
index.js validates
    ↓
Database INSERT into plans, todos, notes
    ↓
Returns created plan
    ↓
App.jsx updates state
    ↓
PlansGrid re-renders with new plan
```

### Fetching Plans

```
App.jsx mounts
    ↓
api.js → GET /api/plans
    ↓
index.js queries database
    ↓
Database JOINs plans with todos & notes
    ↓
Returns array of plans
    ↓
App.jsx state updates
    ↓
PlansGrid renders all plans as PlanCards
```

### Deleting a Plan

```
User clicks × on PlanCard
    ↓
onDelete callback triggered
    ↓
api.js → DELETE /api/plans/:id
    ↓
index.js removes from plans table
    ↓
Cascading delete removes todos & notes
    ↓
App.jsx state updates
    ↓
PlansGrid re-renders without deleted plan
```

---

## 🗄️ Database Relationships

```
plans (1)
├── id (PK)
├── title
└── creation_date
    │
    ├─→ (1:N) ← todos (N)
    │   ├── id
    │   ├── plan_id (FK)
    │   ├── text
    │   ├── done
    │   └── created_at
    │
    └─→ (1:N) ← notes (N)
        ├── id
        ├── plan_id (FK)
        ├── text
        └── created_at

ON DELETE CASCADE:
- Delete plan → automatically delete all its todos & notes
```

---

## 💾 Environment Variables

### Backend (.env)

```
PGHOST=localhost           ← Database host
PGPORT=3000               ← Database port (not standard!)
PGUSER=postgres           ← Database user
PGPASSWORD=...            ← Database password
PGDATABASE=plankeeper_db  ← Database name
PORT=4000                 ← Backend server port
NODE_ENV=development
```

### Frontend (.env)

```
VITE_API_BASE=http://localhost:4000  ← Backend API URL
```

---

## 🐳 Docker Services

### Service: postgres

- Image: postgres:16-alpine
- Port: 3000:5432 (host:container)
- Volume: postgres_data (persistent)
- Health check: pg_isready

### Service: backend

- Build: ./backend/Dockerfile
- Port: 4000:4000
- Env vars: Database credentials
- Depends on: postgres (health)

### Service: frontend

- Build: ./frontend/Dockerfile
- Port: 5173:5173
- Depends on: backend

---

## 📦 Dependencies Summary

### Frontend

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

**DevDependencies:**

```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.8",
  "tailwindcss": "^3.3.5",
  "postcss": "^8.4.31",
  "autoprefixer": "^10.4.16"
}
```

### Backend

```json
{
  "express": "^4.18.2",
  "pg": "^8.11.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

**DevDependencies:**

```json
{
  "nodemon": "^3.0.1",
  "jest": "^29.7.0",
  "supertest": "^6.3.3"
}
```

---

## ✅ Setup Checklist

- [ ] Read QUICKSTART.md
- [ ] Install Node.js 16+ and npm
- [ ] Have PostgreSQL 12+ or Docker
- [ ] Run `npm install` in backend/
- [ ] Run `npm install` in frontend/
- [ ] Set up .env files
- [ ] Run schema.sql
- [ ] Run seed.sql
- [ ] Start backend
- [ ] Start frontend
- [ ] Open http://localhost:5173
- [ ] Test creating a plan

---

## 🎯 Next Actions

1. **Immediate:** Read QUICKSTART.md
2. **Setup:** Follow local or Docker instructions
3. **Verify:** Run manual tests documented
4. **Explore:** Review component source code
5. **Extend:** Customize styling or add features

---

**Everything is organized and ready to go! Start with QUICKSTART.md** 🚀
