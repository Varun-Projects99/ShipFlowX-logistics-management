import express from 'express';
import {
  getMemories,
  createMemory,
  updateMemory,
  deleteMemory
} from '../controllers/memoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMemories)
  .post(createMemory);

router.route('/:id')
  .put(updateMemory)
  .delete(deleteMemory);

export default router;
