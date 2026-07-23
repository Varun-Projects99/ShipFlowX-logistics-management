import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
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
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '1.2 MB'
    },
    dimensions: {
      type: String,
      default: '1920x1080'
    }
  },
  {
    timestamps: true
  }
);

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
