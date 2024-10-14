import express from 'express';
import SocialCard from '../models/SocialCard.mjs';
import { ensureAuth } from '../middleware/auth.mjs';  // Middleware to ensure the user is authenticated

const router = express.Router();

// Create a new social card
router.post('/', ensureAuth, async (req, res) => {
  try {
    const { profilePhoto, profession, description, socialLinks, category, location, designCustomization } = req.body;

    const newCard = new SocialCard({
      userId: req.user._id,
      profilePhoto,
      profession,
      description,
      socialLinks,
      category,
      location,
      designCustomization
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all social cards (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, location } = req.query;
    let query = {};
    if (category) query.category = category;
    if (location) query.location = location;

    const cards = await SocialCard.find(query).populate('userId');
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
