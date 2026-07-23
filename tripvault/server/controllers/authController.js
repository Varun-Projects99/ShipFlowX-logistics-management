import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { isDBConnected } from '../config/db.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is inactive. Please ensure MongoDB is running or update MONGO_URI in server/.env'
      });
    }

    const { name, email, password, confirmPassword } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and password'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // 2. Check if user already exists
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists'
      });
    }

    // 3. Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password
    });

    if (user) {
      const token = generateToken(user._id);
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          token
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data provided'
      });
    }
  } catch (error) {
    console.error('[Register Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is inactive. Please ensure MongoDB is running or update MONGO_URI in server/.env'
      });
    }

    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // 2. Find user by email (include password for verification)
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 3. Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 4. Generate JWT
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token
      }
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login'
    });
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is inactive. Please ensure MongoDB is running or update MONGO_URI in server/.env'
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('[GetMe Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching profile'
    });
  }
};

// @desc    Initiate password reset request
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is inactive. Please ensure MongoDB is running.'
      });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your registered email address' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address'
      });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    return res.status(200).json({
      success: true,
      message: `Reset code generated! Use security code "${resetCode}" to reset your password.`,
      resetCode
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset user password with new password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database connection is inactive. Please ensure MongoDB is running.'
      });
    }

    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide email and new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

