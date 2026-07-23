import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    },
    city: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
    },
    description: {
      type: String,
      default: ''
    },
    travelType: {
      type: String,
      enum: ['Business', 'Family', 'Solo', 'Friends', 'Adventure'],
      default: 'Adventure'
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    budget: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming'
    },
    transportation: {
      type: String,
      enum: ['Flight', 'Train', 'Bus', 'Car', 'Bike', 'Walking'],
      default: 'Flight'
    },
    tags: [{ type: String, trim: true }],
    isArchived: {
      type: Boolean,
      default: false
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    coordinates: {
      lat: { type: Number, default: 20.5937 },
      lng: { type: Number, default: 78.9629 }
    }
  },
  {
    timestamps: true
  }
);

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
