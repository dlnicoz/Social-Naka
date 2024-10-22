import express from 'express';
import SocialCard from '../models/SocialCard.mjs';
import { ensureAuth } from '../middleware/auth.mjs';

const router = express.Router();

// Create a new social card
router.post('/', ensureAuth, async (req, res) => {
  try {
    // Validate the request body
    const { error } = socialCardSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

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

// Fetch all social cards
router.get('/', ensureAuth, async (req, res) => {
  try {
    const cards = await SocialCard.find().populate('userId');
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch a single social card by ID
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const card = await SocialCard.findById(req.params.id).populate('userId');
    if (!card) {
      return res.status(404).json({ message: 'Social card not found' });
    }
    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a social card by ID
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    // Validate the request body
    const { error } = socialCardSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedCard = await SocialCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ message: 'Social card not found' });

    res.json(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a social card by ID
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const deletedCard = await SocialCard.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Social card not found' });
    }
    res.json({ message: 'Social card deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all social cards with pagination and filtering
router.get('/', ensureAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, location } = req.query;

    // Build filter query
    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;

    // Paginate and filter results
    const cards = await SocialCard.find(filter)
      .populate('userId')
      .limit(limit * 1)  // Convert to number
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await SocialCard.countDocuments(filter);

    res.json({
      cards,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
