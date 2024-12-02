import express from 'express';
import mongoose from 'mongoose';
import SocialCard from '../models/SocialCards.mjs';
import User from '../models/Users.mjs';
import verify from '../middleware/verifyToken.mjs'; // Middleware to verify JWT

const router = express.Router();

/**
 * Create a new social card
 */
router.post('/', verify, async (req, res) => {
  try {
    const existingCard = await SocialCard.findOne({ userId: req.user._id });
    if (existingCard) {
      return res.status(400).json({ message: 'User already has a social card' });
    }

    const { name, category, profession, location, profileUrl, phone,isPublic, description, theme, socialLinks } = req.body;

    const newCard = new SocialCard({
      userId: req.user._id,
      username: req.user.username, // Save the username for sharable links
      name,
      category,
      profession,
      location,
      profileUrl,
      phone,
      isPublic,
      description,
      theme,
      socialLinks,
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    res.status(400).json({ error: 'Error creating card', details: err.message });
  }
});

// Filter by category explore page
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    // Filter by category if provided
    if (category) {
      filter.category = category;
    }

    // Search across multiple fields if search query exists
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } }, // Match name
        { profession: { $regex: search, $options: 'i' } }, // Match profession
        { description: { $regex: search, $options: 'i' } }, // Match description
      ];
    }

    // Fetch matching social cards
    const cards = await SocialCard.find(filter);
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cards', details: err.message });
  }
});

/**
 * Fetch the user's social card
 */
router.get('/me', verify, async (req, res) => {
  try {
    const card = await SocialCard.findOne({ userId: req.user._id });

    if (!card) {
      return res.status(404).json({ message: 'No social card found' });
    }

    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching social card for me', details: err.message });
  }
});

/**
 * Fetch a social card by username
 */
router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const socialCard = await SocialCard.findOne({ userId: user._id });
    if (!socialCard) {
      return res.status(404).json({ message: 'Social card not found' });
    }

    res.status(200).json(socialCard);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching social card for username', details: err.message });
  }
});

/**
 * Update or create a social card for the logged-in user
 */
router.put('/me', verify, async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if the user already has a social card
    let socialCard = await SocialCard.findOne({ userId });

    if (socialCard) {
      // Update the existing card
      socialCard = await SocialCard.findOneAndUpdate(
        { userId },
        req.body,  // Fields to update
        { new: true } // Return updated document
      );
      return res.status(200).json(socialCard);
    } else {
      // Create a new social card if none exists
      const newSocialCard = new SocialCard({
        userId,
        ...req.body, // Spread the body to use in the new card
      });
      await newSocialCard.save();
      return res.status(201).json(newSocialCard);
    }
  } catch (err) {
    console.error('Error updating or creating social card:', err);
    res.status(500).json({ message: 'Error updating or creating social card', details: err.message });
  }
});

// PUT /:id route (add validation for ObjectId)
router.put('/:id', verify, async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(`Invalid ID received: ${id}`);
    return res.status(400).json({ error: 'Invalid card ID' });
  }

  try {
    // Check if the card belongs to the logged-in user
    const card = await SocialCard.findOne({ _id: id, userId: req.user._id });
    if (!card) {
      return res.status(404).json({ error: 'Card not found or not authorized to edit.' });
    }

    // Update the social card
    const updatedCard = await SocialCard.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCard);
  } catch (err) {
    console.error('Error updating card using id:', err);
    res.status(500).json({ error: 'Error updating card using id', details: err.message });
  }
});

/**
 * Delete a social card by ID
 */
router.delete('/:id', verify, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the card belongs to the logged-in user
    const card = await SocialCard.findOne({ _id: id, userId: req.user._id });
    if (!card) {
      return res.status(404).json({ error: 'Card not found or not authorized to delete.' });
    }

    await SocialCard.findByIdAndDelete(id);
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting card', details: err.message });
  }
});

export default router;
