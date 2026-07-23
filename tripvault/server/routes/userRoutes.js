import express from 'express';
import {
  updateProfile,
  changePassword,
  exportUserData,
  deleteAccount,
  clearAllData
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.put('/profile', updateProfile);
router.put('/password', changePassword);
router.post('/export-data', exportUserData);
router.delete('/account', deleteAccount);
router.delete('/data', clearAllData);

export default router;
