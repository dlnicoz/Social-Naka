import mongoose from 'mongoose';

const socialCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profilePhoto: { type: String, required: true },
  profession: { type: String, required: true },
  description: { type: String, required: true },
  socialLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true }
  }],
  location: { type: String, required: true },
  phoneNumber: { type: String }, // <-- New field for phone number
  email: { type: String, required: true }, // <-- New field for email
  theme: { type: String }, // <-- New field for theme customization
}, { timestamps: true });

const SocialCard = mongoose.model('SocialCard', socialCardSchema);

export default SocialCard;
