import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: 'default',
    enum: ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'default'],
  },
  date: { type: Date, default: Date.now },
  refreshToken: { type: String, default: null },
  resetToken: { type: String, default: null }, // Add reset token
  resetTokenExpiry: { type: Date, default: null }, // Add token expiry
});

export default mongoose.model('User', userSchema);
