# 🗺️ TripVault - Travel Memory Journal Application

> **TripVault** is a modern, interactive travel memory journal platform built with the **MERN Stack** (MongoDB, Express, React 19, Node.js) and styled with Vanilla CSS and Lucide Icons. It allows users to securely register, log in, create travel journals, upload high-resolution photos, document daily travel memories, and visualize their journeys on an interactive map.

---

## 🌟 Week 2 Deliverables: Trip Management (CRUD)

All requirements for Week 2 have been successfully implemented:
- **Trip Model & Schema**: Mongoose database schema structured with title, destination, startDate, endDate, description, rating, and user owner fields.
- **Protected API Routes**:
  - `POST /api/trips` - Create a new trip linked to the authenticated user.
  - `GET /api/trips` - Retrieve trips belonging exclusively to the logged-in user.
  - `GET /api/trips/:id` - Retrieve a single trip by ID with ownership verification.
  - `PUT /api/trips/:id` - Update trip details (verifying ownership before saving).
  - `DELETE /api/trips/:id` - Delete a trip permanently (verifying ownership before removal).
- **Responsive CRUD UI**:
  - Interactive **Dashboard** displaying travel statistics cards (My Trips, Cities Explored, Countries Visited, Uploaded Photos, Logged Memories, and Budget Spent) alongside a global trip map.
  - **Create Trip Form** and **Edit Trip Form** modals equipped with fully validated fields (dates, currency selectors, ratings, and tags).
  - **Delete Trip Confirmations** that auto-refresh the data stream upon removal.
  - Graceful empty states when no trips are logged yet.

---

## 🛠️ Folder Structure & Architecture

```
tripvault/
├── client/                     # Frontend React 19 + Vite Application
│   ├── src/
│   │   ├── config/             # Centralized config (appConfig.js)
│   │   ├── constants/          # Reusable routes, colors, role constants
│   │   ├── components/         # Reusable UI components (Spinner, PageLoader, ButtonLoader)
│   │   │   ├── common/         # Layout components (Modal, Navbar, Sidebar)
│   │   │   ├── trips/          # Trip modals and CRUD card containers
│   │   │   ├── gallery/        # Lightbox and photo upload controllers
│   │   │   └── memories/       # Journal timeline event modals
│   │   ├── context/            # Global context state (AuthContext.jsx)
│   │   ├── layouts/            # Layout shells (AppLayout, Navbar, Sidebar)
│   │   ├── pages/              # Views (Dashboard, Trips, Gallery, Memories, Stats, Favorites, Settings, Profile)
│   │   ├── services/           # Axios HTTP API instance & interceptors
│   │   ├── utils/              # Helper utilities (date, currency, validators)
│   │   └── styles/             # Global CSS design tokens
│   ├── index.html
│   └── package.json
│
├── server/                     # Backend Node.js + Express API
│   ├── config/                 # Database connection (db.js)
│   ├── controllers/            # Request handlers (authController.js, tripController.js)
│   ├── middleware/             # Route protection middleware (authMiddleware.js)
│   ├── models/                 # Mongoose schemas (User.js, Trip.js, Memory.js, Photo.js)
│   ├── routes/                 # API route declarations (authRoutes.js, tripRoutes.js)
│   └── index.js                # Express app entry point
```

---

## ⚡ Quick Start & Setup Guide

### 1. Configure Local Environment
Copy `.env.example` in both server and client directories to `.env`:
```bash
# Inside tripvault/client
cp .env.example .env

# Inside tripvault/server
cp .env.example .env
```

### 2. Launch Development Servers
- **Backend Server (`server`)**:
  ```bash
  cd server && npm run dev
  ```
- **Frontend App (`client`)**:
  ```bash
  cd client && npm run dev
  ```
