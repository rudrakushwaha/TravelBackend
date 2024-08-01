// routes/reviews.js
import express from 'express';
// import Review from '../models/Review.js';
import auth from "../middleware/auth.js" // Assuming you have an auth middleware
import { Review } from '../models/user.js';

const router = express.Router();

// Create a new review
router.post("/", auth, async (req, res) => {
  try {
    const { placeId, reviewText } = req.body;

    // Extract user information from the request (assuming the user is authenticated)
    // const userId = req.user._id;
    const userName = req.user.firstName + " " + req.user.lastName;
    const userId = req.user._id;


    let review = await Review.findOne({ placeId });
    // Create a new review
    if (review) {
      // If the review exists, push the new review into the reviews array
      review.reviews.push({
        reviewText
      });
    } else {
      // If no review document exists for the place, create a new one
      review = new Review({
        placeId,
        userId,
        userName,
        reviews: [{
          reviewText
        }]
      });
    }

    // Save the review to the database
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create review", error: error.message });
  }
});

// Get reviews for a place
router.get('/:placeId', async (req, res) => {
  try {
    const reviews = await Review.find({ placeId: req.params.placeId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a review (optional)
// router.put('/:id', auth, async (req, res) => { ... });

// Delete a review (optional)
// router.delete('/:id', auth, async (req, res) => { ... });

export default router;
