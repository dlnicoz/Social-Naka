// routes/socialCards.js
import express from 'express';
import SocialCard from '../models/SocialCards.mjs';
import verify from '../middleware/verifyToken.mjs'; // Middleware to verify JWT

const router = express.Router();

// Create a new social card
router.post('/', verify, async (req, res) => {
  try {
    const { name, profession, location, profileUrl, phone, description, theme, socialLinks } = req.body;

    // Create a new social card
    const newCard = new SocialCard({
      userId: req.user._id, // Extracted from the verified token
      name,
      profession,
      location,
      profileUrl,
      phone,
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

// Fetch all social cards
router.get('/', async (req, res) => {
  try {
    const cards = await SocialCard.find();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cards', details: err.message });
  }
});

// Update a social card
router.put('/:id', async (req, res) => {
  try {
    const updatedCard = await SocialCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ error: 'Card not found' });
    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: 'Error updating card', details: err.message });
  }
});

// Delete a social card
router.delete('/:id', async (req, res) => {
  try {
    const deletedCard = await SocialCard.findByIdAndDelete(req.params.id);
    if (!deletedCard) return res.status(404).json({ error: 'Card not found' });
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting card', details: err.message });
  }
});

export default router;
