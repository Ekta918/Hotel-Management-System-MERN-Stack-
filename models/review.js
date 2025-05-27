const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "rooms", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
