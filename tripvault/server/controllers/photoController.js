import Photo from '../models/Photo.js';
import { getFileUrl } from '../services/uploadService.js';
import { logActivity } from '../services/activityService.js';

// @desc    Get user photos
// @route   GET /api/photos
// @access  Private
export const getPhotos = async (req, res) => {
  try {
    const { tripId, isFavorite } = req.query;
    const query = { user: req.user._id };

    if (tripId) query.trip = tripId;
    if (isFavorite !== undefined) query.isFavorite = isFavorite === 'true';

    const photos = await Photo.find(query).populate('trip', 'title destination country').sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: photos.length, data: photos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload multiple photos
// @route   POST /api/photos/upload
// @access  Private
export const uploadPhotos = async (req, res) => {
  try {
    const { tripId, caption } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one image file' });
    }

    const createdPhotos = [];

    for (const file of files) {
      const fileUrl = getFileUrl(req, file.filename);
      const photo = await Photo.create({
        user: req.user._id,
        trip: tripId || null,
        url: fileUrl,
        caption: caption || file.originalname,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
      createdPhotos.push(photo);
    }

    await logActivity(
      req.user._id,
      'PHOTO_UPLOADED',
      `Uploaded ${createdPhotos.length} new photo(s)`,
      `Added to travel media gallery`,
      '/gallery'
    );

    return res.status(201).json({ success: true, count: createdPhotos.length, data: createdPhotos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete photo
// @route   DELETE /api/photos/:id
// @access  Private
export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }

    return res.status(200).json({ success: true, message: 'Photo deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle favorite photo status
// @route   PATCH /api/photos/:id/favorite
// @access  Private
export const toggleFavoritePhoto = async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id, user: req.user._id });
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }

    photo.isFavorite = !photo.isFavorite;
    await photo.save();

    return res.status(200).json({ success: true, data: photo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
