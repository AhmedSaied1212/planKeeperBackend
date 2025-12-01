# PlanKeeper - Quick Start Guide

## Project Overview

**PlanKeeper** is a modern single-page app for creating and managing plans with todos and notes.

**Tech Stack:**

- **Frontend:** React 18 + Vite + TailwindCSS 3
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Architecture:** REST API with separate frontend/backend

---

## What's Been Built

### ✅ Frontend (`/frontend`)

- ✨ **React Components:**

  - `FloatingAddButton` - Floating '+' button with animations
  - `PlanModal` - Modal for creating plans with todos and notes
  - `PlanCard` - Card displaying plan details
  - `TodoItem` / `NoteItem` - List item components
  - `PlansGrid` - Responsive grid of all plans
  - `App.jsx` - Main app with state management

- 🎨 **Styling:**

  - TailwindCSS with custom animations
  - Responsive design (mobile, tablet, desktop)
  - Modern UI with smooth transitions

- 📡 **API Integration:**
  - `services/api.js` - API client for all backend calls

### ✅ Backend (`/backend`)

- 🚀 **Express Server:**

  - CORS enabled for frontend communication
  - Environment variable configuration
  - PostgreSQL connection pooling

- 📋 **REST API Endpoints:**

  - `GET /api/plans` - Fetch all plans
  - `GET /api/plans/:id` - Fetch single plan
  - `POST /api/plans` - Create new plan
  - `DELETE /api/plans/:id` - Delete plan
  - `PUT /api/plans/:id` - Update plan

- ✔️ **Validation:**
  - Input validation on todos/notes
  - Max length enforcement (titles: 100, todos: 150, notes: 300)
  - Parameterized queries for SQL injection prevention

### ✅ Database (`/backend`)

- **Schema Files:**

  - `schema.sql` - Creates plans, todos, notes tables with relationships
  - `seed.sql` - Sample data for testing

- **Tables:**
  - `plans` (id, title, creation_date)
  - `todos` (id, plan_id, text, done, created_at)
  - `notes` (id, plan_id, text, created_at)

### ✅ Configuration & Docs

- `docker-compose.yml` - Docker setup for PostgreSQL, backend, frontend
- `README.md` - Complete project documentation
- `.gitignore` - Git ignore rules
- `.env.example` files in frontend & backend

---

## Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **PostgreSQL** 12+ (OR Docker)
- **Git**

### Option 1: Quick Local Setup with Docker PostgreSQL

**Step 1: Start PostgreSQL**

```bash
docker run --name plankeeper-postgres -e POSTGRES_PASSWORD=postgres -p 3000:5432 -d postgres:16-alpine
```

**Step 2: Create Database**

```bash
# Wait a moment for PostgreSQL to be ready, then:
psql -h localhost -p 3000 -U postgres -c "CREATE DATABASE plankeeper_db;"
psql -h localhost -p 3000 -U postgres -d plankeeper_db -f backend/schema.sql
psql -h localhost -p 3000 -U postgres -d plankeeper_db -f backend/seed.sql
```

**Step 3: Start Backend**

```bash
cd backend
npm install
# Create .env file with PostgreSQL credentials (see .env.example)
npm run dev
# Backend runs on http://localhost:4000
```

**Step 4: Start Frontend (new terminal)**

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

**Step 5: Open in Browser**

```
http://localhost:5173
```

### Option 2: Complete Docker Setup (All-in-One)

**Step 1: Create .env**

```bash
echo "PGPASSWORD=your_password" > .env
```

**Step 2: Start Everything**

```bash
docker-compose up -d
```

Services will be available at:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:4000 (API)
- **Database:** localhost:3000 (PostgreSQL)

**Step 3: Stop Services**

```bash
docker-compose down
```

---

## Testing the App

### Manual Test Flow

1. **Create a Plan**

   - Click the blue '+' button in bottom-right
   - Enter a plan title (optional)
   - Add 2-3 todos (e.g., "Buy groceries", "Clean room")
   - Add 1-2 notes (e.g., "Bring reusable bags")
   - Click "Create" button

2. **View Plans**

   - Plans appear as cards on the home page
   - Cards show: title, creation date, todo preview, notes preview

3. **Delete Items Before Saving**

   - Click '+' again
   - Add a todo
   - Click the '×' button to remove it
   - Close modal - verify item wasn't saved

4. **Delete a Plan**

   - Click '×' button on plan card
   - Confirm deletion
   - Plan disappears immediately

5. **Persistent Data**
   - Create a plan
   - Refresh the browser (Ctrl+R or Cmd+R)
   - Plan still exists - data persisted to database

---

## Database Connection

**PostgreSQL Configuration:**

- **Host:** localhost
- **Port:** 3000 (mapped in Docker, or set in .env)
- **User:** postgres
- **Database:** plankeeper_db
- **Password:** Set in .env file

To manually connect:

```bash
psql -h localhost -p 3000 -U postgres -d plankeeper_db
```

---

## Environment Files

### Backend `.env`

```
PGHOST=localhost
PGPORT=3000
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=plankeeper_db
PORT=4000
NODE_ENV=development
```

### Frontend `.env`

```
VITE_API_BASE=http://localhost:4000
```

---

## File Structure

```
plan/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FloatingAddButton.jsx
│   │   │   ├── PlanModal.jsx
│   │   │   ├── PlanCard.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── NoteItem.jsx
│   │   │   └── PlansGrid.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── index.html
│   ├── Dockerfile
│   └── .env.example
├── backend/
│   ├── index.js (Express server + API endpoints)
│   ├── schema.sql
│   ├── seed.sql
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── README.md
├── .gitignore
└── QUICKSTART.md (this file)
```

---

## Key Features Implemented

✅ **Create Plans**

- Title (optional)
- Multiple todos (max 150 chars each)
- Multiple notes (max 300 chars each)
- Smooth animations when adding items

✅ **Manage Todos & Notes**

- Add with Enter key or Add button
- Remove individual items before saving
- Animated list updates

✅ **View Plans**

- Grid layout (responsive: 1-3 columns)
- Shows creation date, title, previews
- Click "View Details" for full content

✅ **Delete Plans**

- Delete button on each card
- Confirmation prompt
- Immediate removal from UI

✅ **Animations**

- Floating button pulse on idle
- Modal fade + scale
- List items slide up + fade
- Card hover lift effect

✅ **Responsive Design**

- Mobile: Single column, full-width inputs
- Tablet: 2 columns
- Desktop: 3 columns

✅ **Accessibility**

- ARIA labels on buttons
- Keyboard navigation (Tab, Enter, Escape)
- Focus management in modal
- Color contrast WCAG AA

---

## Troubleshooting

### PostgreSQL Connection Error

```
Error: connect ECONNREFUSED localhost:3000
```

- Verify PostgreSQL is running: `docker ps` should show `plankeeper-postgres`
- Check .env has correct credentials
- Database not created? Run: `psql -h localhost -p 3000 -U postgres -c "CREATE DATABASE plankeeper_db;"`

### Backend fails to start

```
Error: listen EADDRINUSE :::4000
```

- Port 4000 is in use. Kill the process or use different port:
  - Windows: `netstat -ano | find ":4000"` then `taskkill /PID <PID>`
  - Mac/Linux: `lsof -i :4000` then `kill -9 <PID>`

### Frontend won't connect to API

- Verify backend is running: `curl http://localhost:4000/health`
- Check `vite.config.js` proxy target is `http://localhost:4000`
- Check browser console for CORS errors

### Docker permission denied

```
permission denied while trying to connect to Docker daemon
```

- Add user to docker group: `sudo usermod -aG docker $USER`
- Or use `sudo docker-compose up`

---

## Next Steps

1. **Install dependencies:**

   ```bash
   cd frontend && npm install && cd ../backend && npm install
   ```

2. **Configure database** (see "Getting Started" above)

3. **Run locally or with Docker** (see "Getting Started" above)

4. **Test the application** (see "Testing the App" above)

5. **Deploy to production** (see README.md for details)

---

## API Documentation

### GET /api/plans

Returns all plans with todos and notes.

```bash
curl http://localhost:4000/api/plans
```

### POST /api/plans

Create a new plan.

```bash
curl -X POST http://localhost:4000/api/plans \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Weekend chores",
    "todos": [
      {"text": "Buy groceries"},
      {"text": "Clean room"}
    ],
    "notes": [
      {"text": "Bring reusable bags"}
    ]
  }'
```

### DELETE /api/plans/:id

Delete a plan.

```bash
curl -X DELETE http://localhost:4000/api/plans/1
```

---

## Support

For detailed information, see:

- **Full Documentation:** `README.md`
- **Component Details:** Source files in `frontend/src/components/`
- **API Endpoints:** `backend/index.js`
- **Database Schema:** `backend/schema.sql`

---

**Happy planning! 🚀📋**
