# Team Board

A simple **team task management board** where users can register, log in, and manage tasks collaboratively.
The application allows creating tasks, assigning them, and tracking their progress through **To Do → In Progress → Done** stages.

---

## Project Structure

```
team-board
│
├── backend
│   ├── .env
│   ├── package.json
│   └── src
│       └── server.ts
│
└── frontend
    ├── .env
    ├── package.json
    └── src
```

---

## Features

* User **registration and login**
* **JWT authentication**
* Create tasks.
* Assign tasks to users.
* Update task status by moving them across To Do, In-Progress, and Done sections.
* Edit and delete tasks.
* JWT authenticated tasks routes.
* Edit and Delete tasks by authorised person.
* Logout

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* Database: MongoDB Atlas cloud
* JWT Authentication

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# Backend Setup

Navigate to the backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

### Environment Variables

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Backend (Development)

```
npm run dev
```

### Run Backend (Production)

```
npm start
```

The backend entry file is:

```
src/server.ts with root directory set to backend
```

---

# Frontend Setup

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

### Environment Variables

Create a `.env` file inside `frontend/`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Run Frontend

```
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

# API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```
GET    /api/tasks/getAll
POST   /api/create
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

All task routes require **JWT authentication** via:

```
Authorization: Bearer <token>
```

---

# Deployment

### Backend (Render)

1. Connect GitHub repository
2. Set root directory to `backend`
3. Add environment variables
4. Start command:

```
npm start
```

### Frontend (Vercel)

1. Import repository
2. Set root directory to `frontend`
3. Add environment variable:

```
NEXT_PUBLIC_API_URL=https://your-backend-url/api
```

---

# Future Improvements

* Drag and drop tasks
* Task comments
* Task priority and due dates
* User avatars
* Notifications
* Role-based permissions implementation
* Filtering tasks