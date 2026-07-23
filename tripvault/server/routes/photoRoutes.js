import express from 'express';
import {
  getPhotos,
  uploadPhotos,
  deletePhoto,
  toggleFavoritePhoto
} from '../controllers/photoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../services/uploadService.js';

const router = express.Router();

router.use(protect);

router.get('/', getPhotos);
router.post('/upload', upload.array('photos', 10), uploadPhotos);
router.delete('/:id', deletePhoto);
router.patch('/:id/favorite', toggleFavoritePhoto);

export default router;
