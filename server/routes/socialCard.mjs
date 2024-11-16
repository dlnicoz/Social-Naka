import express from 'express';
import SocialCard from '../models/SocialCard.mjs';
import { ensureAuth } from '../middleware/auth.mjs';

const router = express.Router();

// Fetch all social cards (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10,  location } = req.query;

    // Build filter query
    const filter = {};
    if (location) filter.location = location;

    // Paginate and filter results
    const cards = await SocialCard.find(filter)
      .populate('userId')
      .limit(Number(limit))
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

// Create a new social card (restricted to authenticated users)
router.post('/socialcards', ensureAuth, async (req, res) => {
  try {
    console.log('Creating social card with data:', req.body);

    const validSocialLinks = Object.entries(req.body.socialLinks || {})
      .filter(([key, value]) => value.trim())
      .map(([platform, url]) => ({ platform, url }));

    if (!validSocialLinks.length) {
      return res.status(400).send({ error: 'No valid social links provided' });
    }

    const socialCardData = {
      ...req.body,
      socialLinks: validSocialLinks,
      userId: req.user._id, // Add authenticated user ID
    };

    const newSocialCard = await SocialCard.create(socialCardData);
    res.status(201).send({ success: true, data: newSocialCard });
  } catch (error) {
    console.error('Error creating social card:', error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});







// Fetch a single social card by ID (public)
router.get('/:id', async (req, res) => {
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

// Update a social card by ID (restricted to authenticated users)
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    const updatedCard = await SocialCard.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedCard) return res.status(404).json({ message: 'Social card not found' });

    res.json(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a social card by ID (restricted to authenticated users)
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const deletedCard = await SocialCard.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deletedCard) {
      return res.status(404).json({ message: 'Social card not found' });
    }
    res.json({ message: 'Social card deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
