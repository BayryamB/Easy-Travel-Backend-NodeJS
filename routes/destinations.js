const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// Get all destinations
router.get("/", async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get destination by ID
router.get("/:id", async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);

        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new destination
router.post("/", async (req, res) => {
    try {
        const { name, country, description, photos, cover, price, rating } =
            req.body;

        // Validate required fields
        if (!name || !country) {
            return res
                .status(400)
                .json({ error: "Name and country are required" });
        }

        const destination = new Destination({
            name,
            country,
            description,
            photos,
            cover,
            price,
            rating,
        });

        await destination.save();
        res.status(201).json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update destination by ID
router.put("/:id", async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete destination by ID
router.delete("/:id", async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);

        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }

        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add like to destination
router.post("/:id/like", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: userId } },
            { new: true }
        );

        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove like from destination
router.delete("/:id/unlike/:userId", async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.params.userId } },
            { new: true }
        );

        if (!destination) {
            return res.status(404).json({ error: "Destination not found" });
        }

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
