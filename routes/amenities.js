const express = require("express");
const router = express.Router();
const Amenity = require("../models/Amenity");

// Get all amenities
router.get("/", async (req, res) => {
    try {
        const amenities = await Amenity.find();
        res.status(200).json(amenities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get amenities by category
router.get("/category/:category", async (req, res) => {
    try {
        const amenities = await Amenity.find({ category: req.params.category });

        if (amenities.length === 0) {
            return res
                .status(404)
                .json({ error: "No amenities found for this category" });
        }

        res.status(200).json(amenities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get popular amenities
router.get("/popular/true", async (req, res) => {
    try {
        const amenities = await Amenity.find({ isPopular: true });
        res.status(200).json(amenities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single amenity by ID
router.get("/:id", async (req, res) => {
    try {
        const amenity = await Amenity.findById(req.params.id);

        if (!amenity) {
            return res.status(404).json({ error: "Amenity not found" });
        }

        res.status(200).json(amenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new amenity
router.post("/", async (req, res) => {
    try {
        const { name, category } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res
                .status(400)
                .json({ error: "name and category are required" });
        }

        // Check if amenity already exists
        const existingAmenity = await Amenity.findOne({ name });
        if (existingAmenity) {
            return res.status(400).json({ error: "Amenity already exists" });
        }

        const amenity = new Amenity(req.body);
        await amenity.save();

        res.status(201).json(amenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an amenity
router.put("/:id", async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!amenity) {
            return res.status(404).json({ error: "Amenity not found" });
        }

        res.status(200).json(amenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an amenity
router.delete("/:id", async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndDelete(req.params.id);

        if (!amenity) {
            return res.status(404).json({ error: "Amenity not found" });
        }

        res.status(200).json({ message: "Amenity deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark amenity as popular
router.post("/:id/popular", async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndUpdate(
            req.params.id,
            { isPopular: true },
            { new: true }
        );

        if (!amenity) {
            return res.status(404).json({ error: "Amenity not found" });
        }

        res.status(200).json(amenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Unmark amenity as popular
router.post("/:id/unpopular", async (req, res) => {
    try {
        const amenity = await Amenity.findByIdAndUpdate(
            req.params.id,
            { isPopular: false },
            { new: true }
        );

        if (!amenity) {
            return res.status(404).json({ error: "Amenity not found" });
        }

        res.status(200).json(amenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
