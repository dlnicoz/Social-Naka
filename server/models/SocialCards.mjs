import mongoose from 'mongoose';

const socialCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User ',
    required: true,
  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  profession: { type: String, required: true },
  location: { type: String, required: true },
  profileImage: { type: String, required: false },  // Make this optional
  isPublic: { type: Boolean, default: true }, // Default to true
  phone: { 
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Example: Validate for a 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  description: { type: String },
  theme: { type: String },
  socialLinks: [
    {
      platform: { type: String, required: true }, // Make platform required
      url: { 
        type: String,
        validate: {
          validator: function(v) {
            return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i.test(v); // Basic URL validation
          },
          message: props => `${props.value} is not a valid URL!`
        }
      },
    },
  ],
}, { timestamps: true });

// Optional: Add an index on userId for better query performance
socialCardSchema.index({ userId: 1 });

export default mongoose.model('SocialCard', socialCardSchema);