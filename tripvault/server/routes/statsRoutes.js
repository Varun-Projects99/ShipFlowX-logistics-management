import express from 'express';
import { getDashboardStats, getAnalyticsStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/analytics', getAnalyticsStats);

export default router;
