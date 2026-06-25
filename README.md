# MERN Task Manager

A production-ready MERN task manager with React, Vite, Node.js, Express, MongoDB Atlas, JWT authentication, bcryptjs password hashing, Axios, protected routes, and complete task CRUD.

## Folder Structure

```txt
mern-task-manager/
  backend/
    .env.example
    package.json
    src/
      app.js
      server.js
      config/
        db.js
        env.js
      controllers/
        authController.js
        taskController.js
      middleware/
        authMiddleware.js
        errorMiddleware.js
      models/
        Task.js
        User.js
      routes/
        authRoutes.js
        taskRoutes.js
      utils/
        AppError.js
        asyncHandler.js
        generateToken.js
  frontend/
    .env.example
    index.html
    package.json
    vercel.json
    vite.config.js
    src/
      App.jsx
      main.jsx
      styles.css
      api/
        axios.js
      components/
        LoadingSpinner.jsx
        Navbar.jsx
        ProtectedRoute.jsx
        TaskForm.jsx
        TaskItem.jsx
      context/
        AuthContext.jsx
      pages/
        Dashboard.jsx
        Login.jsx
        NotFound.jsx
        Register.jsx
      utils/
        authStorage.js
  .gitignore
  render.yaml
```

## Local Setup

1. Create a MongoDB Atlas cluster and copy the connection string.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`.
3. Copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.
4. Install and run the backend:

```bash
cd backend
npm install
npm run dev
```

5. Install and run the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The API runs on `http://localhost:5000` and the frontend runs on `http://localhost:5173`.

## API Routes

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

## Render Deployment

1. Push the project to GitHub.
2. Create a new Render Web Service.
3. Set the root directory to `backend`.
4. Set build command to `npm install`.
5. Set start command to `npm start`.
6. Add environment variables:

```txt
NODE_ENV=production
PORT=10000
MONGO_URI=<your MongoDB Atlas URI>
JWT_SECRET=<long random secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-vercel-app.vercel.app
```

7. In MongoDB Atlas, allow Render network access. For a simple deployment, use `0.0.0.0/0`; for stricter security, use Render's documented outbound IP options where available.

## Vercel Deployment

1. Create a new Vercel project from the same GitHub repository.
2. Set the root directory to `frontend`.
3. Use the default Vite build settings:

```txt
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. Add this environment variable:

```txt
VITE_API_URL=https://your-render-api.onrender.com/api
```

5. Redeploy after changing environment variables.

## Production Notes

- Passwords are hashed with bcryptjs before storage.
- JWTs are sent in the `Authorization: Bearer <token>` header.
- Tasks are scoped by authenticated user id on every task route.
- The backend uses centralized error handling.
- The frontend stores auth in localStorage for a simple JWT SPA flow.
- For higher-security production apps, consider httpOnly refresh-token cookies, rate limiting, request logging, and a stricter CORS allowlist.
