import Favorite from '../models/Favorite.js';
import Trip from '../models/Trip.js';
import Photo from '../models/Photo.js';
import Memory from '../models/Memory.js';

// @desc    Get user favorite items across trips, photos, and memories
// @route   GET /api/favorites
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    const favoriteTrips = await Trip.find({ user: req.user._id, isFavorite: true });
    const favoritePhotos = await Photo.find({ user: req.user._id, isFavorite: true }).populate('trip', 'title');
    const favoriteMemories = await Memory.find({ user: req.user._id, isFavorite: true }).populate('trip', 'title');

    return res.status(200).json({
      success: true,
      data: {
        trips: favoriteTrips,
        photos: favoritePhotos,
        memories: favoriteMemories
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle favorite status on trip, photo, or memory
// @route   POST /api/favorites/toggle
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const { itemType, itemId } = req.body;

    if (!['trip', 'photo', 'memory'].includes(itemType)) {
      return res.status(400).json({ success: false, message: 'Invalid item type' });
    }

    let item;
    if (itemType === 'trip') item = await Trip.findOne({ _id: itemId, user: req.user._id });
    if (itemType === 'photo') item = await Photo.findOne({ _id: itemId, user: req.user._id });
    if (itemType === 'memory') item = await Memory.findOne({ _id: itemId, user: req.user._id });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.isFavorite = !item.isFavorite;
    await item.save();

    return res.status(200).json({
      success: true,
      isFavorite: item.isFavorite,
      message: item.isFavorite ? 'Added to favorites' : 'Removed from favorites'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
