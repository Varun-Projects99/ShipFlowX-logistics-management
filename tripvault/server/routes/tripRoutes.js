import express from 'express';
import {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  duplicateTrip,
  toggleArchiveTrip
} from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTrips)
  .post(createTrip);

router.route('/:id')
  .get(getTripById)
  .put(updateTrip)
  .delete(deleteTrip);

router.post('/:id/duplicate', duplicateTrip);
router.patch('/:id/archive', toggleArchiveTrip);

export default router;
