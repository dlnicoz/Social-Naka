import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  profilePhoto: { type: String, required: false }, // Ensure this is present
});


const User = mongoose.model('User', userSchema);
export default User;
