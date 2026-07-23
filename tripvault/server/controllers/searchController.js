import Trip from '../models/Trip.js';
import Memory from '../models/Memory.js';
import Photo from '../models/Photo.js';

// @desc    Global search across Trips, Countries, Cities, Photos, Memories, and Tags
// @route   GET /api/search
// @access  Private
export const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(200).json({
        success: true,
        data: { trips: [], memories: [], photos: [] }
      });
    }

    const regex = new RegExp(q.trim(), 'i');
    const userId = req.user._id;

    const [trips, memories, photos] = await Promise.all([
      Trip.find({
        user: userId,
        $or: [
          { title: regex },
          { destination: regex },
          { country: regex },
          { city: regex },
          { tags: regex }
        ]
      }).limit(10),

      Memory.find({
        user: userId,
        $or: [
          { title: regex },
          { description: regex },
          { location: regex },
          { tags: regex }
        ]
      }).limit(10),

      Photo.find({
        user: userId,
        $or: [
          { caption: regex }
        ]
      }).limit(10)
    ]);

    return res.status(200).json({
      success: true,
      query: q,
      totalResults: trips.length + memories.length + photos.length,
      data: {
        trips,
        memories,
        photos
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
