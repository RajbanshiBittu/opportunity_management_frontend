# 🚀 CEOFactory Opportunity Management System - Frontend

A modern, production-ready Opportunity Management platform built with **React**, **Vite**, **Tailwind CSS**, and **Context API**. The application provides secure authentication, protected routes, opportunity management workflows, and a clean enterprise-grade user experience.

---

## 📖 Overview

CEOFactory Opportunity Management System enables users to:

* Register and create accounts
* Authenticate securely
* Access protected dashboard features
* Create, view, update, and manage opportunities
* Maintain session persistence across page refreshes
* Interact with a responsive and modern user interface

This frontend communicates with a RESTful backend API and follows scalable architecture principles suitable for production environments.

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration
* User Login
* Session Persistence
* Protected Routes
* Automatic Authentication Validation
* Logout Functionality

---

## 📊 Opportunity Management

* Create Opportunities
* View Opportunities
* Update Opportunities
* Delete Opportunities
* Dynamic Opportunity Cards
* Real-Time UI Updates

---

## 🎨 Modern User Experience

* Fully Responsive Design
* Mobile-Friendly Layout
* Clean Dashboard Interface
* Loading States
* Error Handling
* Form Validation
* Reusable Components

---

## ⚡ Performance Optimizations

* Vite Build System
* React Context State Management
* Component-Based Architecture
* Fast Refresh Support
* Optimized Production Builds
* Reusable API Layer

---

# 🏗️ Project Architecture

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── OpportunityCard.jsx
│   │   └── OpportunityForm.jsx
│   │
│   ├── context/
│   │   ├── context.js
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧩 Core Modules

## AuthContext

Centralized authentication state management.

Responsibilities:

* Store logged-in user data
* Manage login/logout operations
* Persist sessions
* Handle authentication validation

---

## useAuth Hook

Provides a clean interface for accessing authentication data throughout the application.

Example:

```javascript
const { user, login, logout } = useAuth();
```

---

## PrivateRoute Protection

Protects sensitive routes from unauthorized access.

Example:

```javascript
<Route
  path="/"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

Only authenticated users can access protected pages.

---

# 🌐 API Integration

The frontend communicates with the backend using Axios.

Location:

```text
src/services/api.js
```

Typical API Operations:

| Action             | Method | Endpoint               |
| ------------------ | ------ | ---------------------- |
| Register User      | POST   | /api/auth/register     |
| Login User         | POST   | /api/auth/login        |
| Get Current User   | GET    | /api/auth/me           |
| Create Opportunity | POST   | /api/opportunities     |
| Get Opportunities  | GET    | /api/opportunities     |
| Update Opportunity | PUT    | /api/opportunities/:id |
| Delete Opportunity | DELETE | /api/opportunities/:id |

---

# 🔧 Environment Configuration

Create a `.env` file in the root directory.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/your-username/opportunity_management_frontend.git
```

---

## 2. Navigate to Project

```bash
cd opportunity_management_frontend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create:

```text
.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 5. Run Development Server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

# 📦 Production Build

Generate optimized production assets:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 🚀 Deployment

## Frontend Deployment

Platform:

* Vercel

Build Configuration:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

---

## Backend Deployment

Platform:

* Render

Environment Variables:

```env
PORT=5000
DATABASE_URL=<database-url>
JWT_SECRET=<secret>
```

---

# 🛡️ Security Considerations

* Protected Client Routes
* Token-Based Authentication
* Secure API Communication
* Centralized Authentication State
* Session Validation on Application Load
* Unauthorized Access Prevention

---

# 🧪 Future Enhancements

* Role-Based Access Control (RBAC)
* Opportunity Search & Filtering
* Pagination
* Advanced Analytics Dashboard
* Email Notifications
* Audit Logs
* Activity Tracking
* Team Collaboration Features

---

# 🛠️ Tech Stack

### Frontend

* React 19
* Vite 8
* React Router DOM
* Axios
* Tailwind CSS
* Context API

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

# 👨‍💻 Author

**Bittu Rajbanshi**

---

## 📄 License

This project is developed as part of the CEOFactory Assignment and is intended for educational, evaluation, and demonstration purposes.
