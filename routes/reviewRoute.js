const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require("../models/review");
const Room = require("../models/room");

router.post("/add", async (req, res) => {
  const { roomId, userId, rating, comment } = req.body;

  if (!roomId || !userId || !rating || comment === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    
    // Optionally: check if user exists (up to you)
    // const userExists = await User.findById(userId);
    // if (!userExists) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    const review = new Review({ roomId, userId, rating, comment });
    await review.save();

    res.status(200).json({ message: "Review added successfully" });
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ message: "Failed to add review", error: err });
  }
});

// Get reviews for a room
router.get("/:roomid", async (req, res) => {
  try {
    const roomObjectId = new mongoose.Types.ObjectId(req.params.roomid);

    const reviews = await Review.find({ roomId: roomObjectId }).populate("userId", "name");

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

module.exports = router;
