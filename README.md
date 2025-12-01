# PlanKeeper - Modern Plan & Todo App

A modern single-page application to create and manage plans with todos and notes. Built with React, Vite, TailwindCSS, Node.js, Express, and PostgreSQL.

## Features

- ✨ Create plans with todos and notes
- 📝 Add/remove todos and notes before saving
- 🎨 Smooth animations and responsive design
- 💾 Persistent storage with PostgreSQL
- 🗑️ Delete entire plans
- 📱 Mobile-friendly interface
- ♿ Accessibility-focused with ARIA labels and keyboard navigation
- 🚀 REST API for all operations

## Project Structure

```
plankeeper/
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
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── index.js
│   ├── schema.sql
│   ├── seed.sql
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 16+ and npm
- PostgreSQL 12+ OR Docker & Docker Compose
- Git

## Installation & Setup

### Option 1: Local Development (with Docker PostgreSQL)

1. **Clone or download the project**

   ```bash
   cd plankeeper
   ```

2. **Start PostgreSQL using Docker**

   ```bash
   docker run --name plankeeper-postgres -e POSTGRES_PASSWORD=postgres -p 3000:5432 -d postgres:16-alpine
   ```

3. **Create database and tables**

   ```bash
   psql -h localhost -p 3000 -U postgres -c "CREATE DATABASE plankeeper_db;"
   psql -h localhost -p 3000 -U postgres -d plankeeper_db -f backend/schema.sql
   psql -h localhost -p 3000 -U postgres -d plankeeper_db -f backend/seed.sql
   ```

4. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run dev
   # Server runs on http://localhost:4000
   ```

5. **Setup Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm install
   npm run dev
   # App runs on http://localhost:5173
   ```

### Option 2: Complete Docker Setup

1. **Create `.env` file in project root**

   ```bash
   echo "PGPASSWORD=your_secure_password" > .env
   ```

2. **Start all services**

   ```bash
   docker-compose up -d
   ```

   This starts:

   - PostgreSQL on port 3000
   - Backend on port 4000
   - Frontend on port 5173

3. **Access the application**

   - Open http://localhost:5173 in your browser

4. **Stop services**
   ```bash
   docker-compose down
   ```

## Database Configuration

PostgreSQL runs on **port 3000** with:

- **User**: postgres
- **Database**: plankeeper_db
- **Password**: Set in .env

### Database Schema

**plans** table:

- `id` (PRIMARY KEY)
- `title` (VARCHAR 200, optional)
- `creation_date` (TIMESTAMP)

**todos** table:

- `id` (PRIMARY KEY)
- `plan_id` (FOREIGN KEY)
- `text` (TEXT)
- `done` (BOOLEAN)
- `created_at` (TIMESTAMP)

**notes** table:

- `id` (PRIMARY KEY)
- `plan_id` (FOREIGN KEY)
- `text` (TEXT)
- `created_at` (TIMESTAMP)

## API Endpoints

Base URL: `/api`

### GET `/api/plans`

Get all plans sorted by creation date (newest first)

**Response:**

```json
[
  {
    "id": 1,
    "title": "Weekend Shopping",
    "creation_date": "2025-12-01T10:30:00.000Z",
    "todos": [{ "id": 1, "text": "Buy groceries", "done": false }],
    "notes": [{ "id": 1, "text": "Bring reusable bags" }]
  }
]
```

### GET `/api/plans/:id`

Get a single plan with all its todos and notes

### POST `/api/plans`

Create a new plan

**Request Body:**

```json
{
  "title": "Weekend chores",
  "todos": [{ "text": "Buy groceries" }, { "text": "Clean room" }],
  "notes": [{ "text": "Bring reusable bags" }]
}
```

**Response:** 201 Created with full plan object

### DELETE `/api/plans/:id`

Delete a plan and all associated todos and notes

**Response:**

```json
{
  "message": "Plan deleted",
  "id": 1
}
```

### PUT `/api/plans/:id` (Optional)

Update plan title

## Frontend Components

### FloatingAddButton

- Circular button with '+' icon
- Bottom-right corner, pulsing animation
- Opens modal on click

### PlanModal

- Responsive modal for creating plans
- Plan title input (optional, max 100 chars)
- Todo and note input with Add buttons
- Support for Enter key to add items
- List of added items with remove buttons
- Create button (disabled if no todos/notes)
- Focus trap and Escape key support

### PlanCard

- Grid card displaying plan info
- Shows creation date, title, previews of todos/notes
- View Details button to see full content
- Delete button with confirmation

### PlansGrid

- Responsive grid (1-3 columns)
- Shows all plans from database
- Hover animations

## Frontend Validation

- Todos: max 150 characters, cannot be empty
- Notes: max 300 characters, cannot be empty
- Titles: max 100 characters, optional
- Plans require at least one todo or note

## Styling

- **Framework**: TailwindCSS 3
- **Design**: Professional, minimal, modern
- **Colors**: Blue (#3B82F6) as primary, grays for backgrounds
- **Animations**: Smooth fade-in, slide-up, scale transitions
- **Responsive**: Mobile-first, optimized for tablet and desktop

## Manual Testing

1. **Create a plan**

   - Click '+' button
   - Add plan title (optional)
   - Add 2-3 todos
   - Add 1-2 notes
   - Click Create
   - Verify plan appears as card on page

2. **Modify items in modal**

   - Click '+' again
   - Add a todo, then remove it
   - Verify it doesn't persist after close

3. **Delete plan**

   - Click delete button (×) on card
   - Confirm deletion
   - Verify plan is removed

4. **Persistent data**
   - Create a plan
   - Refresh browser
   - Verify plan still exists

## Environment Variables

### Backend (.env)

```
PGHOST=localhost
PGPORT=3000
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=plankeeper_db
PORT=4000
NODE_ENV=development
```

### Frontend (.env)

```
VITE_API_BASE=http://localhost:4000
```

## Development

### Frontend Commands

```bash
cd frontend
npm run dev      # Start dev server on port 5173
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Commands

```bash
cd backend
npm start        # Start server
npm run dev      # Start with nodemon (auto-reload)
npm test         # Run tests
```

## Production Deployment

### Using Docker Compose

```bash
docker-compose -f docker-compose.yml up -d
```

### Manual Production Setup

1. Set environment variables in .env
2. Build frontend: `cd frontend && npm run build`
3. Serve frontend dist/ folder with a static server
4. Run backend: `cd backend && npm start`
5. Ensure PostgreSQL is running and accessible

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running on port 3000
- Check credentials in .env match PostgreSQL setup
- Ensure database `plankeeper_db` exists
- Run schema.sql to create tables

### Backend Cannot Connect to Frontend

- Verify frontend is running on port 5173
- Check CORS is enabled in backend (should be automatic)
- Verify backend API_BASE in frontend is correct

### Port Already in Use

- PostgreSQL: `docker stop plankeeper-postgres` or kill process on port 3000
- Backend: Kill process on port 4000
- Frontend: Vite will suggest alternative port or use `--port 5174`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility

- ✅ ARIA labels on all buttons and inputs
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus management with focus trap in modal
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Semantic HTML structure

## Performance Notes

- Plans are fetched on app load and cached in state
- Optimistic UI updates for create/delete
- Minimal re-renders with React hooks
- TailwindCSS utilities are tree-shaken in production build
- Database indexes on common queries

## Future Enhancements

- [ ] User authentication
- [ ] Plan sharing & collaboration
- [ ] Recurring plans/tasks
- [ ] Plan categories/tags
- [ ] Drag-and-drop reordering
- [ ] Plan templates
- [ ] Export plans to PDF
- [ ] Dark mode

## License

MIT License - feel free to use this project as a starting point.

## Support

For issues or questions:

1. Check the Troubleshooting section
2. Verify all prerequisites are installed
3. Check console logs for error messages
4. Review database connection settings

---

**Happy Planning! 📋✨**
