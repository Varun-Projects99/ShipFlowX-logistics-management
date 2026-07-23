import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      default: null
    },
    title: {
      type: String,
      required: [true, 'Memory title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    date: {
      type: Date,
      default: Date.now
    },
    location: {
      type: String,
      default: ''
    },
    mood: {
      type: String,
      enum: ['Happy', 'Inspired', 'Relaxed', 'Adventurous', 'Romantic', 'Nostalgic'],
      default: 'Happy'
    },
    weather: {
      type: String,
      enum: ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Clear'],
      default: 'Sunny'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    photos: [{ type: String }],
    tags: [{ type: String, trim: true }],
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Memory = mongoose.model('Memory', memorySchema);
export default Memory;
