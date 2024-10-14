import mongoose from 'mongoose';

const socialCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  socialLinks: [
    {
      platform: String,
      url: String
    }
  ],
  category: String,
  location: String,
  designCustomization: {
    color: String,
    font: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SocialCard', socialCardSchema);
