// models/SocialCard.js
import mongoose from 'mongoose';

const socialCardSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required
  profession: { type: String, required: true }, // Required
  location: { type: String, required: true }, // Required
  profileUrl: { type: String, required: true }, // Required
  phone: { type: String }, // Optional
  description: { type: String }, // Optional
  theme: { type: String, default: 'minimal' }, // Default theme
  socialLinks: [
    {
      platform: { type: String }, // Optional
      url: { type: String }, // Optional
    },
  ],
}, { timestamps: true });

export default mongoose.model('SocialCard', socialCardSchema);
