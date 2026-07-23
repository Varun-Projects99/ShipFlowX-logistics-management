import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: 'Wanderer & travel enthusiast. Documenting journeys across the globe.'
    },
    country: {
      type: String,
      default: 'Global Citizen'
    },
    language: {
      type: String,
      default: 'English'
    },
    socialLinks: {
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      website: { type: String, default: '' }
    },
    travelPreferences: {
      preferredTravelType: { type: String, default: 'Adventure' },
      bucketListCountries: [{ type: String }]
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare candidate password with hashed password
userSchema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Transform output to remove sensitive fields
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model('User', userSchema);
export default User;
