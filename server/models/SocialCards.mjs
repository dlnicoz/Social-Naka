import mongoose from 'mongoose';

const socialCardSchema = new mongoose.Schema({
  // Reference to the user who owns this card
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },

  // Social Card Information
  name: { type: String, required: true }, // Required
  profession: { type: String, required: true }, // Required
  location: { type: String, required: true }, // Required
  profileUrl: { type: String, required: true }, // Required
  phone: { type: String }, // Optional
  description: { type: String }, // Optional
  theme: { type: String, default: 'minimal' }, // Default theme

  // Links - Embedded directly into the schema
  socialLinks: [
    {
      platform: { type: String }, // Optional
      url: { type: String }, // Optional
    },
  ],
}, { timestamps: true });

export default mongoose.model('SocialCard', socialCardSchema);
