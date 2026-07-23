import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    actionType: {
      type: String,
      enum: ['TRIP_CREATED', 'TRIP_EDITED', 'TRIP_DELETED', 'PHOTO_UPLOADED', 'MEMORY_ADDED'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '/dashboard'
    }
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
