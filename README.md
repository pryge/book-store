# 📚 BookStore Application

A modern full-stack web application for managing a bookstore catalog and user accounts, built with **React**, **TypeScript**, **Vite**, **Express**, **Prisma ORM**, and **PostgreSQL (Supabase)**.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 + TypeScript + Vite
- **Routing**: React Router DOM (with ProtectedRoute & AdminRoute guards)
- **Styling**: CSS Modules (*.module.css) + CSS Variables
- **Icons**: @hugeicons/react

### **Backend**
- **Runtime**: Node.js + TypeScript (tsx)
- **Server**: Express 5
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma ORM
- **Security**: JSON Web Tokens (JWT), bcryptjs password hashing, CORS

---

## 📁 Project Structure

```
book-store/
├── backend/                # Express TypeScript Backend API
│   ├── prisma/             # Prisma Schema & Database config
│   └── src/
│       ├── controllers/    # Request handlers (auth, book, user)
│       ├── middlewares/    # Auth, role check, & error handling
│       ├── routes/         # Express API routes (/api/auth, /api/books, /api/users)
│       ├── utils/          # JWT & bcrypt password utilities
│       └── index.ts        # Server entrypoint
│
└── frontend/               # React TypeScript Vite Frontend
    └── src/
        ├── api/            # API client functions (auth, books, users)
        ├── components/     # UI components (Navbar)
        ├── context/        # React AuthContext & AuthProvider
        ├── guards/         # ProtectedRoute & AdminRoute guards
        ├── pages/          # Pages (LoginPage, RegisterPage, BooksPage, UsersPage)
        └── types/          # TypeScript interfaces (User, Book, Role)
```

---

## 🚀 Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

---

### **1. Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in backend/:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   DIRECT_URL="postgresql://user:password@host:5432/dbname"
   JWT_SECRET="your-secret-jwt-key"
   JWT_EXPIRES_IN="7d"
   PORT=3000
   ```

4. Push Prisma database schema:
   ```bash
   npm run prisma:db-push
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Backend will run at `http://localhost:3000`*

---

### **2. Frontend Setup**

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *Frontend will run at `http://localhost:5173`*

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate user & get JWT | Public |
| `GET` | `/api/books` | Get all books | Authenticated |
| `GET` | `/api/books/:id` | Get book details by ID | Authenticated |
| `POST` | `/api/books` | Create a new book | Admin Only |
| `PUT` | `/api/books/:id` | Update book details | Admin Only |
| `DELETE` | `/api/books/:id` | Delete a book | Admin Only |
| `GET` | `/api/users` | List all registered users | Admin Only |
| `POST` | `/api/users` | Create a user | Admin Only |
| `PUT` | `/api/users/:id` | Update user / role | Admin Only |
| `DELETE` | `/api/users/:id` | Delete a user | Admin Only |

---

Built by humans
