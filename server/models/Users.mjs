import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: 'default', // Default avatar, stored as a string
    enum: ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'default'], // Predefined avatars
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
