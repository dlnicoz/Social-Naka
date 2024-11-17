// routes/socialCards.js
import express from 'express';
import SocialCard from '../models/SocialCards.mjs';

const router = express.Router();

// Create a new social card
router.post('/', async (req, res) => {
    const { name, profileUrl, profession, location, phone, description, theme, socialLinks } = req.body;
  
    // Validate required fields
    if (!name || !profileUrl || !profession || !location) {
      return res.status(400).json({ error: 'Name, Profile URL, Profession, and Location are required' });
    }
  
    try {
      const newCard = new SocialCard({
        name,
        profileUrl,
        profession,
        location,
        phone,
        description,
        theme,
        socialLinks,
      });
  
      const savedCard = await newCard.save();
      res.status(201).json(savedCard);
    } catch (err) {
      res.status(500).json({ error: 'Error creating card', details: err.message });
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
