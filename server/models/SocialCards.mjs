import mongoose from 'mongoose';

const socialCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  category: { type: String , required: true},
  profession: { type: String, required: true },
  location: { type: String, required: true },
  profileUrl: { type: String, required: true },
  isPublic:{type: Boolean},
  phone: { type: String },
  description: { type: String },
  theme: { type: String },
  socialLinks: [
    {
      platform: { type: String },
      url: { type: String },
    },
  ],
}, { timestamps: true });

export default mongoose.model('SocialCard', socialCardSchema);
