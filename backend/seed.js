import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { product } from './product-data.js';

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to DB');

  await Product.deleteMany(); // optional cleanup
  await Product.insertMany(product);
  console.log('✅ Products inserted!');

  process.exit();
} catch (err) {
  console.error('❌ Error:', err);
  process.exit(1);
}
