import Trip from '../models/Trip.js';
import { logActivity } from '../services/activityService.js';

// @desc    Get user trips with filtering and search
// @route   GET /api/trips
// @access  Private
export const getTrips = async (req, res) => {
  try {
    const { status, country, travelType, search, archived, isFavorite } = req.query;

    const query = { user: req.user._id };

    if (archived !== undefined) {
      query.isArchived = archived === 'true';
    }

    if (isFavorite !== undefined) {
      query.isFavorite = isFavorite === 'true';
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (country && country !== 'All') {
      query.country = new RegExp(country, 'i');
    }

    if (travelType && travelType !== 'All') {
      query.travelType = travelType;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { destination: searchRegex },
        { country: searchRegex },
        { city: searchRegex },
        { tags: searchRegex }
      ];
    }

    const trips = await Trip.find(query).sort({ startDate: -1 });

    return res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single trip by ID
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    return res.status(200).json({ success: true, data: trip });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
export const createTrip = async (req, res) => {
  try {
    const {
      title,
      destination,
      country,
      city,
      coverImage,
      description,
      travelType,
      startDate,
      endDate,
      budget,
      currency,
      status,
      transportation,
      tags,
      coordinates
    } = req.body;

    const trip = await Trip.create({
      user: req.user._id,
      title,
      destination,
      country,
      city,
      coverImage: coverImage || undefined,
      description,
      travelType,
      startDate,
      endDate,
      budget: Number(budget) || 0,
      currency: currency || 'USD',
      status: status || 'Upcoming',
      transportation: transportation || 'Flight',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [],
      coordinates: coordinates || { lat: 20.5937, lng: 78.9629 }
    });

    await logActivity(
      req.user._id,
      'TRIP_CREATED',
      `Created trip "${trip.title}"`,
      `Destination: ${trip.destination}, ${trip.country}`,
      '/trips'
    );

    return res.status(201).json({ success: true, data: trip });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = async (req, res) => {
  try {
    let trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim());
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    await logActivity(
      req.user._id,
      'TRIP_EDITED',
      `Updated trip "${trip.title}"`,
      `Status: ${trip.status}`,
      '/trips'
    );

    return res.status(200).json({ success: true, data: trip });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    await logActivity(
      req.user._id,
      'TRIP_DELETED',
      `Deleted trip "${trip.title}"`,
      `Destination: ${trip.destination}`,
      '/trips'
    );

    return res.status(200).json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Duplicate trip
// @route   POST /api/trips/:id/duplicate
// @access  Private
export const duplicateTrip = async (req, res) => {
  try {
    const sourceTrip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!sourceTrip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    const tripData = sourceTrip.toObject();
    delete tripData._id;
    delete tripData.createdAt;
    delete tripData.updatedAt;

    tripData.title = `${tripData.title} (Copy)`;
    tripData.status = 'Upcoming';

    const newTrip = await Trip.create(tripData);

    await logActivity(
      req.user._id,
      'TRIP_CREATED',
      `Duplicated trip "${newTrip.title}"`,
      `Destination: ${newTrip.destination}`,
      '/trips'
    );

    return res.status(201).json({ success: true, data: newTrip });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle archive trip status
// @route   PATCH /api/trips/:id/archive
// @access  Private
export const toggleArchiveTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    trip.isArchived = !trip.isArchived;
    await trip.save();

    return res.status(200).json({ success: true, data: trip });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
