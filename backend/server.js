// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/products.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config(); // Loads variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  'https://e-commerece-website-bice.vercel.app', // frontend domain
];
// Middleware
app.use(express.json()); 
app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));         
app.use(helmet());          

app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later."
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.log('❌ MongoDB Error:', err));

// Test route

app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
  res.send('API is runnin');
});
app.use('/api/products', productRoutes);
app.use("/api/user", userRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});