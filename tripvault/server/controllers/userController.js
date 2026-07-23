import User from '../models/User.js';
import Trip from '../models/Trip.js';
import Memory from '../models/Memory.js';
import Photo from '../models/Photo.js';
import Favorite from '../models/Favorite.js';
import Activity from '../models/Activity.js';
import bcrypt from 'bcryptjs';

// @desc    Update user profile & preferences
// @route   PUT /api/user/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, country, language, socialLinks, travelPreferences, avatarUrl } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name.trim();
    if (bio !== undefined) user.bio = bio;
    if (country !== undefined) user.country = country;
    if (language !== undefined) user.language = language;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
    if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };
    if (travelPreferences) user.travelPreferences = { ...user.travelPreferences, ...travelPreferences };

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/user/password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide both current and new password' });
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Export all user travel data as JSON
// @route   POST /api/user/export-data
// @access  Private
export const exportUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    const [profile, trips, memories, photos, favorites, activities] = await Promise.all([
      User.findById(userId),
      Trip.find({ user: userId }),
      Memory.find({ user: userId }),
      Photo.find({ user: userId }),
      Favorite.find({ user: userId }),
      Activity.find({ user: userId })
    ]);

    const exportPayload = {
      exportDate: new Date().toISOString(),
      app: 'TripVault',
      profile,
      trips,
      memories,
      photos,
      favorites,
      activities
    };

    return res.status(200).json({
      success: true,
      data: exportPayload
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user account and all associated data
// @route   DELETE /api/user/account
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    await Promise.all([
      Trip.deleteMany({ user: userId }),
      Memory.deleteMany({ user: userId }),
      Photo.deleteMany({ user: userId }),
      Favorite.deleteMany({ user: userId }),
      Activity.deleteMany({ user: userId }),
      User.findByIdAndDelete(userId)
    ]);

    return res.status(200).json({ success: true, message: 'Account and all data permanently deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clear all user travel data (keep user account active)
// @route   DELETE /api/user/data
// @access  Private
export const clearAllData = async (req, res) => {
  try {
    const userId = req.user._id;

    await Promise.all([
      Trip.deleteMany({ user: userId }),
      Memory.deleteMany({ user: userId }),
      Photo.deleteMany({ user: userId }),
      Favorite.deleteMany({ user: userId }),
      Activity.deleteMany({ user: userId })
    ]);

    return res.status(200).json({ success: true, message: 'All travel data has been cleared' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
