import express from 'express';
import SocialCard from '../models/SocialCards.mjs';
import verify from '../middleware/verifyToken.mjs'; // Middleware to verify JWT

const router = express.Router();

// Create a new social card
router.post('/', verify, async (req, res) => {
  try {
    const existingCard = await SocialCard.findOne({ userId: req.user._id });
    if (existingCard) return res.status(400).json({ message: 'User already has a social card' });

    const { name, profession, location, profileUrl, phone, description, theme, socialLinks } = req.body;

    const newCard = new SocialCard({
      userId: req.user._id,
      username: req.user.username, // Save the username for sharable links
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


// Fetch all social cards (Public)
router.get('/', async (req, res) => {
  try {
    const cards = await SocialCard.find();
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cards', details: err.message });
  }
});


// Update a social card
router.put('/:id', verify, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the card belongs to the logged-in user
    const card = await SocialCard.findOne({ _id: id, userId: req.user._id });
    if (!card) return res.status(404).json({ error: 'Card not found or not authorized to edit.' });

    // Update the card
    const updatedCard = await SocialCard.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: 'Error updating card', details: err.message });
  }
});

// Delete a social card
router.delete('/:id', verify, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the card belongs to the logged-in user
    const card = await SocialCard.findOne({ _id: id, userId: req.user._id });
    if (!card) return res.status(404).json({ error: 'Card not found or not authorized to delete.' });

    await SocialCard.findByIdAndDelete(id);
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting card', details: err.message });
  }
});



// Fetch the user's social card
router.get('/me', verify, async (req, res) => {
  try {
    const card = await SocialCard.findOne({ userId: req.user._id });
    if (!card) return res.status(404).json({ message: 'No social card found' });
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching social card', details: err.message });
  }
});

// Fetch social card by username dedicated link
router.get('/user/:username', async (req, res) => {
  try {
    const card = await SocialCard.findOne({ username: req.params.username });
    if (!card) return res.status(404).json({ message: 'No social card found' });
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching social card', details: err.message });
  }
});



export default router;
