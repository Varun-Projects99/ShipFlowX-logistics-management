import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import memoryRoutes from './routes/memoryRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (with automatic memory fallback if offline)
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded media files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'TripVault API Server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/user', userRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` 🚀 TripVault API Server running on port ${PORT}`);
  console.log(` 🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(` 🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(` ✈️  Trip Management API: http://localhost:${PORT}/api/trips`);
  console.log(`====================================================`);
});
