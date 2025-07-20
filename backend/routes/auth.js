import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";

const router = express.Router();
dotenv.config(); // Loads variables from .env
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
router.post(
  "/register",
  [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Valid email required"),
    check("password").isLength({ min: 6 }).withMessage("Min 6 char password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg });

    try {
      const { username, email, password } = req.body;

      const existing = await User.findOne({ email });
      if (existing)
        return res.status(400).json({ error: "Email already registered" });

      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hash });
      await newUser.save();

      res.status(201).json({ message: "User registered!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// LOGIN
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email required"),
    check("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid email" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ error: "Invalid password" });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
      res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
