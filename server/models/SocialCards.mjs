import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For hashing passwords

const socialCardSchema = new mongoose.Schema({
  // User Authentication Fields
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  // Social Card Information
  name: { type: String, required: true }, // Required
  profession: { type: String, required: true }, // Required
  location: { type: String, required: true }, // Required
  profileUrl: { type: String, required: true }, // Required
  phone: { type: String }, // Optional
  description: { type: String }, // Optional
  theme: { type: String, default: 'minimal' }, // Default theme

  // Avatar - Store the name or relative path of the avatar image
  avatar: {
    type: String,
    default: 'default', // Default avatar, stored as a string
    enum: ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'default'], // Predefined avatars
  },

  // Links - Embedded directly into the schema
  socialLinks: [
    {
      platform: { type: String }, // Optional
      url: { type: String }, // Optional
    },
  ],

}, { timestamps: true });

// Password hashing before saving user
socialCardSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified or new

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error); // Pass the error to the next middleware
  }
});

// Method to check password during login
socialCardSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error('Error comparing password:', error);
    throw new Error('Password comparison failed');
  }
};

// Error handling for Mongoose save operations
socialCardSchema.post('save', function(doc, next) {
  console.log('Document saved successfully:', doc);
  next();
});

// Error handling for Mongoose errors during database operations
socialCardSchema.on('error', (error) => {
  console.error('Mongoose Error:', error);
});

export default mongoose.model('SocialCard', socialCardSchema);
