import Trip from '../models/Trip.js';
import Memory from '../models/Memory.js';
import Photo from '../models/Photo.js';
import Activity from '../models/Activity.js';

// @desc    Get dashboard metrics & statistics
// @route   GET /api/stats/dashboard
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [trips, memories, photos, activities] = await Promise.all([
      Trip.find({ user: userId }),
      Memory.find({ user: userId }),
      Photo.find({ user: userId }),
      Activity.find({ user: userId }).sort({ createdAt: -1 }).limit(10)
    ]);

    const countriesSet = new Set(trips.map(t => t.country).filter(Boolean));
    const citiesSet = new Set(trips.map(t => t.city).filter(Boolean));

    const totalBudgetSpent = trips.reduce((sum, t) => sum + (t.budget || 0), 0);
    const upcomingTrips = trips.filter(t => t.status === 'Upcoming').length;
    const completedTrips = trips.filter(t => t.status === 'Completed').length;
    const ongoingTrips = trips.filter(t => t.status === 'Ongoing').length;

    // Recent Trip & Recent Memory
    const recentTrip = trips.length > 0 ? trips[0] : null;
    const recentMemory = memories.length > 0 ? memories[0] : null;

    // Estimate total distance travelled (mock calc based on trip count)
    const distanceTravelled = trips.length * 1250;

    return res.status(200).json({
      success: true,
      data: {
        totalTrips: trips.length,
        totalCountries: countriesSet.size,
        totalCities: citiesSet.size,
        totalPhotos: photos.length,
        totalMemories: memories.length,
        budgetSpent: totalBudgetSpent,
        distanceTravelled,
        upcomingTrips,
        completedTrips,
        ongoingTrips,
        travelStreak: `${completedTrips + 1} Trips`,
        recentTrip,
        recentMemory,
        activities
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get detailed analytics & distribution statistics
// @route   GET /api/stats/analytics
// @access  Private
export const getAnalyticsStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const trips = await Trip.find({ user: userId });

    // Travel type distribution
    const travelTypes = { Business: 0, Family: 0, Solo: 0, Friends: 0, Adventure: 0 };
    trips.forEach(t => {
      if (travelTypes[t.travelType] !== undefined) travelTypes[t.travelType]++;
    });

    // Country frequency map
    const countryCounts = {};
    trips.forEach(t => {
      if (t.country) countryCounts[t.country] = (countryCounts[t.country] || 0) + 1;
    });

    const mostVisitedCountry = Object.entries(countryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

    // Longest & Shortest trip
    let longestTrip = null;
    let shortestTrip = null;
    let maxDays = -1;
    let minDays = Infinity;

    trips.forEach(t => {
      if (t.startDate && t.endDate) {
        const days = Math.max(1, Math.ceil((new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24)));
        if (days > maxDays) {
          maxDays = days;
          longestTrip = { ...t.toObject(), days };
        }
        if (days < minDays) {
          minDays = days;
          shortestTrip = { ...t.toObject(), days };
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        travelTypeDistribution: travelTypes,
        countryCounts,
        mostVisitedCountry,
        longestTrip,
        shortestTrip
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
