const express = require("express");
const jwt = require("jsonwebtoken");
const Address = require("../models/Address");

const router = express.Router();

// Middleware to authenticate the user
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stores user ID in req.user
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Add New Address (POST /api/addresses)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newAddress = new Address({ ...req.body, userId: req.user.id });
    await newAddress.save();
    res.status(201).json({ message: "Address added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get User's Addresses (GET /api/addresses)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete Address (DELETE /api/addresses/:id)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address || address.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
