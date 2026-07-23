import Memory from '../models/Memory.js';
import { logActivity } from '../services/activityService.js';

// @desc    Get user memories with filtering
// @route   GET /api/memories
// @access  Private
export const getMemories = async (req, res) => {
  try {
    const { tripId, mood, weather, search, isFavorite } = req.query;
    const query = { user: req.user._id };

    if (tripId) query.trip = tripId;
    if (mood && mood !== 'All') query.mood = mood;
    if (weather && weather !== 'All') query.weather = weather;
    if (isFavorite !== undefined) query.isFavorite = isFavorite === 'true';

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ title: regex }, { description: regex }, { location: regex }, { tags: regex }];
    }

    const memories = await Memory.find(query).populate('trip', 'title destination country').sort({ date: -1 });

    return res.status(200).json({ success: true, count: memories.length, data: memories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new memory
// @route   POST /api/memories
// @access  Private
export const createMemory = async (req, res) => {
  try {
    const { title, description, date, location, mood, weather, rating, photos, tags, trip } = req.body;

    const memory = await Memory.create({
      user: req.user._id,
      trip: trip || null,
      title,
      description,
      date: date || new Date(),
      location: location || '',
      mood: mood || 'Happy',
      weather: weather || 'Sunny',
      rating: Number(rating) || 5,
      photos: Array.isArray(photos) ? photos : [],
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : []
    });

    await logActivity(
      req.user._id,
      'MEMORY_ADDED',
      `Logged memory "${memory.title}"`,
      `Mood: ${memory.mood}, Rating: ${memory.rating}★`,
      '/timeline'
    );

    return res.status(201).json({ success: true, data: memory });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update memory
// @route   PUT /api/memories/:id
// @access  Private
export const updateMemory = async (req, res) => {
  try {
    let memory = await Memory.findOne({ _id: req.params.id, user: req.user._id });
    if (!memory) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim());
    }

    memory = await Memory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    return res.status(200).json({ success: true, data: memory });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete memory
// @route   DELETE /api/memories/:id
// @access  Private
export const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!memory) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }

    return res.status(200).json({ success: true, message: 'Memory deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
