import express from 'express';
import Product from '../models/Product.js';
import { validate as isUuid } from 'uuid';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) return res.status(400).json({ error: 'Invalid product ID format' });

  try {
    const product = await Product.findOne({ id }).select('-internalNotes').lean();
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
