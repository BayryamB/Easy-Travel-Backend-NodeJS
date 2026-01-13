const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("userId", "username profilePicture")
            .populate("hostId", "username profilePicture")
            .populate("propertyId", "title cover");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reviews by property ID
router.get("/property/:propertyId", async (req, res) => {
    try {
        const reviews = await Review.find({ propertyId: req.params.propertyId })
            .populate("userId", "username profilePicture")
            .populate("hostId", "username profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reviews by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId })
            .populate("propertyId", "title cover")
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single review by ID
router.get("/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate("userId", "username profilePicture")
            .populate("hostId", "username profilePicture")
            .populate("propertyId", "title cover");

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new review
router.post("/", async (req, res) => {
    try {
        const { propertyId, userId, hostId, rating, comment } = req.body;

        // Validate required fields
        if (!propertyId || !userId || !hostId || !rating) {
            return res
                .status(400)
                .json({
                    error: "propertyId, userId, hostId, and rating are required",
                });
        }

        if (rating < 1 || rating > 5) {
            return res
                .status(400)
                .json({ error: "Rating must be between 1 and 5" });
        }

        // Check if user already reviewed this property
        const existingReview = await Review.findOne({ propertyId, userId });
        if (existingReview) {
            return res
                .status(400)
                .json({ error: "You have already reviewed this property" });
        }

        const review = new Review(req.body);
        await review.save();
        await review.populate("userId", "username profilePicture");
        await review.populate("hostId", "username profilePicture");
        await review.populate("propertyId", "title cover");

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a review
router.put("/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("userId", "username profilePicture")
            .populate("hostId", "username profilePicture")
            .populate("propertyId", "title cover");

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a review
router.delete("/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark review as helpful
router.post("/:id/helpful", async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $inc: { helpful: 1 } },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
