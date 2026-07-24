# 🚢 ShipFlowX - Enterprise Logistics Management & Real-Time Shipment Tracking Platform

> **ShipFlowX** is a modern, high-performance logistics management and shipment tracking system built with the **MERN Stack** (MongoDB, Express, React 19, Node.js). This update introduces professional Week 1 architectural improvements, structuring the project for enterprise maintainability without changing any existing UI/UX or business flows.

---

## 🌟 Week 1 Architecture & Engineering Improvements

- **Centralized Configuration (`src/config/appConfig.js`)**:
  - Unifies application branding, versioning, default locale, theme settings, and pagination sizes.
  - Dynamically resolved through Vite environment variables (`import.meta.env`) with safe local fallbacks.
- **Reusable Loading Components (`src/components/common/`)**:
  - **`Spinner.jsx`**: Fully customizable animated SVG loader with built-in WAI-ARIA loading accessibility support.
  - **`Loader.jsx`**: Inline or block-level loading state wrapper.
  - **`PageLoader.jsx`**: Full-screen page loader modal overlay for initial system boot or route changes.
  - **`ButtonLoader.jsx`**: In-button loading spinner for active async transactions.
- **Environment Configuration**:
  - Added `.env.example` defining environment variables: `VITE_APP_NAME`, `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`, `VITE_COMPANY_NAME`, `VITE_SUPPORT_EMAIL`.
- **Constants Definition (`src/constants/`)**:
  - **`routes.js`**: Core route path mapping constants (Landing, Dashboard, Login, profile, etc.).
  - **`apiEndpoints.js`**: Reusable REST API endpoint definitions (Auth, Trips, Memories, Photos, etc.).
  - **`colors.js`**: Core design system color theme constants.
  - **`roles.js`**: System authorization roles (Admin, Dispatcher, Driver, Customer, User).
  - **`shipmentStatus.js`**: Shipment status tracking variables (`PENDING`, `IN_TRANSIT`, `DELIVERED`, etc.).
- **Utility Functions (`src/utils/`)**:
  - **`dateFormatter.js`**: Reusable date formatters (relative times, standard locales).
  - **`currencyFormatter.js`**: Locale-aware currency formatting with customizable fraction sizes.
  - **`trackingNumberGenerator.js`**: Generates carrier-compliant unique tracking numbers.
  - **`validators.js`**: client-side validation logic (email structures, password lengths).
  - **`helpers.js`**: General helpers (debounce, truncate text, safe JSON parsing).

---

## 📁 Refactored Folder Structure

```
tripvault/
├── client/                     # Frontend React 19 + Vite Application
│   ├── src/
│   │   ├── assets/             # Static assets, images, and SVGs
│   │   ├── config/             # Centralized config (appConfig.js)
│   │   ├── constants/          # Reusable routes, colors, role constants
│   │   ├── components/         # Reusable UI components
│   │   │   └── common/         # PageLoader, ButtonLoader, Spinner, Modal
│   │   ├── context/            # Global context state (AuthContext.jsx)
│   │   ├── layouts/            # Layout shells (AppLayout, Navbar, Sidebar)
│   │   ├── pages/              # Views (Dashboard, Login, Gallery, etc.)
│   │   ├── services/           # Axios HTTP API instance & interceptors
│   │   ├── utils/              # Helper utilities (date, currency, validators)
│   │   ├── styles/             # Global CSS design tokens
│   │   ├── App.jsx             # React Router DOM configuration
│   │   └── main.jsx            # React root entry point
│   ├── .env.example            # Environment variables configuration template
│   ├── index.html
│   └── package.json
│
├── server/                     # Backend Node.js + Express API
│   ├── config/                 # Database connection (db.js)
│   ├── controllers/            # Request handlers (authController.js)
│   ├── middleware/             # Route protection middleware (authMiddleware.js)
│   ├── models/                 # Mongoose schemas (User.js)
│   ├── routes/                 # API route declarations (authRoutes.js)
│   └── index.js                # Express app entry point
```

---

## ⚡ Quick Start & Setup Guide

### 1. Environment Variables Configuration
Copy `.env.example` in the `client` directory to `.env` and fill in the values:
```bash
cp client/.env.example client/.env
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
