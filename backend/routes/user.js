// routes/user.js (ES Module style)
import express from "express";
import User from "../models/User.js"; // make sure your model files also use `export default`
import verifyToken from "../middleware/auth.js"; // your JWT auth middleware

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    console.log(req.userId)
    const user = await User.findById(req.userId).select("username email");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ name: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

