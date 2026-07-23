# ✈️ TripVault - Capture Memories. Preserve Adventures.

> **TripVault** is a modern, high-performance travel memory journal built with the **MERN Stack** (MongoDB, Express, React 19, Node.js). Users can securely register, login, store travel journals, organize photo memories, and revisit past adventures.

---

## 🌟 Features (Week 1 Implementation)

- **Authentication System**: Secure JWT-based authentication with `bcryptjs` password hashing and token persistence in `localStorage`.
- **Validation**:
  - Full Name, Email format, and Password strength meter (Weak/Medium/Strong).
  - Password matching verification and interactive Show/Hide password toggle.
- **Responsive Landing Page**:
  - High-impact Hero section with tagline and call-to-action buttons.
  - Interactive Feature cards grid highlighting core platform capabilities.
  - Responsive footer and navigation drawer.
- **Personalized Dashboard**:
  - User welcome header displaying dynamic user profile data.
  - Metric cards for **My Trips**, **Memories**, **Photos**, and **Countries Visited**.
  - Quick action buttons and recent activity tracking.
- **Future-Ready Architecture**: Modular directory layout pre-configured for Trip CRUD, Cloudinary Photo Uploads, Interactive Maps, Timeline Views, and Travel Analytics.

---

## 🎨 Design System & Aesthetics

- **Color Palette**:
  - **Background**: `#0F172A` (Deep Slate Dark Mode)
  - **Cards**: `#1E293B` (Glassmorphic Slate)
  - **Primary**: `#3B82F6` (Electric Blue)
  - **Accent**: `#06B6D4` (Cyan Glow)
  - **Success**: `#22C55E` | **Warning**: `#F59E0B` | **Error**: `#EF4444`
- **UI Effects**: Glassmorphism, smooth CSS micro-interactions, soft shadows, custom typography (`Inter` & `Outfit` fonts).

---

## 📁 Directory & Folder Structure

```
tripvault/
├── client/                     # Frontend React 19 + Vite Application
│   ├── src/
│   │   ├── assets/             # SVGs, icons, and static assets
│   │   ├── components/         # Reusable UI & Layout Components
│   │   │   ├── common/         # ProtectedRoute guard
│   │   │   └── layout/         # Navbar, Footer, AppNavbar, AppSidebar, AppLayout
│   │   ├── contexts/           # AuthContext (state management & API calls)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Landing, Login, Register, Dashboard, Placeholders
│   │   ├── services/           # Axios API configuration & interceptors
│   │   ├── styles/             # Global index.css design tokens & glassmorphism
│   │   ├── App.jsx             # React Router DOM 7 configuration
│   │   └── main.jsx            # React root entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Node.js + Express API
│   ├── config/                 # Database connection (db.js)
│   ├── controllers/            # Request handlers (authController.js)
│   ├── middleware/             # Route protection middleware (authMiddleware.js)
│   ├── models/                 # Mongoose schemas (User.js)
│   ├── routes/                 # API route declarations (authRoutes.js)
│   ├── services/               # Future business logic services
│   ├── utils/                  # JWT token utilities (jwt.js)
│   ├── .env                    # Environment configuration
│   ├── .env.example            # Environment template
│   ├── index.js                # Express app entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start & Setup Guide

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas Connection URI)

---

### 2. Backend Setup (`server`)

1. Navigate to the server folder:
   ```bash
   cd tripvault/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/tripvault
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend server:
   ```bash
   # Production mode
   npm start

   # Development mode (with watching)
   npm run dev
   ```
   > Server will run at `http://localhost:5000`

---

### 3. Frontend Setup (`client`)

1. Navigate to the client folder in a new terminal window:
   ```bash
   cd tripvault/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   > Client will run at `http://localhost:3000`

---

## 🔗 Backend API Reference

### Auth Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user (name, email, password, confirmPassword) |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Protected | Fetch current user profile (requires `Bearer <JWT>`) |
| `GET` | `/api/health` | Public | API health status check |

---

## 🚀 Future Roadmap & Scope (Week 2 & Beyond)

- [ ] **Trip Management (CRUD)**: Create, view, update, and delete travel itineraries.
- [ ] **Cloudinary Integration**: Direct client photo uploads to cloud storage.
- [ ] **Interactive Maps**: Mapbox / Leaflet integration for pinning visited spots.
- [ ] **Travel Analytics**: Visual charts for distance traveled and country progress.
- [ ] **Dark/Light Mode Switcher**: User customizable theme toggling.
