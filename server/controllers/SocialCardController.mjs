import SocialCard from '../models/SocialCard.js';
import multer from 'multer';

// Configure Multer
const storage = multer.memoryStorage(); // Store uploaded files in memory as Buffer
const upload = multer({ storage: storage });

// Create Social Card with Profile Image
export const createSocialCard = async (req, res) => {
  try {
    const { name, category, profession, location, isPublic, phone, description, theme, socialLinks } = req.body;

    // Convert the uploaded file to Base64
    const base64Image = req.file.buffer.toString('base64');

    // Create a new social card
    const socialCard = new SocialCard({
      userId: req.user._id, // Assuming userId is from authenticated user
      name,
      category,
      profession,
      location,
      profileImage: base64Image, // Save Base64 image
      isPublic,
      phone,
      description,
      theme,
      socialLinks: JSON.parse(socialLinks), // Parse socialLinks if sent as JSON string
    });

    await socialCard.save();
    res.status(201).json({ message: 'Social card created successfully!', socialCard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create social card' });
  }
};

// Fetch Social Card with Profile Image
export const getSocialCard = async (req, res) => {
  try {
    const { id } = req.params;
    const socialCard = await SocialCard.findById(id);

    if (!socialCard) {
      return res.status(404).json({ error: 'Social card not found' });
    }

    res.status(200).json(socialCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch social card' });
  }
};
