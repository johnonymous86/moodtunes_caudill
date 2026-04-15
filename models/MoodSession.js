import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    url: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { _id: false }
);

const MoodSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    mood: {
      type: String,
      required: true,
    },
    moodLabel: {
      type: String,
      required: true,
    },
    moodEmoji: {
      type: String,
      default: '',
    },
    tracks: {
      type: [TrackSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MoodSession ||
  mongoose.model('MoodSession', MoodSessionSchema);
