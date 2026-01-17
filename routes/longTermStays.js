const express = require("express");
const router = express.Router();
const Rent = require("../models/Rent");

// Get all long-term stays
router.get("/", async (req, res) => {
    try {
        const rents = await Rent.find()
            .populate("hostId", "-password")
            .populate("reviews")
            .populate("amenities");
        res.status(200).json(rents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recent long-term stays (limited to 5)
router.get("/recent", async (req, res) => {
    try {
        const rents = await Rent.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("hostId", "-password")
            .populate("amenities");
        res.status(200).json(rents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single long-term stay by ID
router.get("/:id", async (req, res) => {
    try {
        const rent = await Rent.findById(req.params.id)
            .populate("hostId", "-password")
            .populate("reviews")
            .populate("amenities")
            .populate("bookings");

        if (!rent) {
            return res
                .status(404)
                .json({ message: "Long-term stay not found" });
        }

        res.status(200).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new long-term stay
router.post("/", async (req, res) => {
    try {
        const {
            hostId,
            title,
            location,
            bedroomCount,
            bathroomCount,
            maxGuests,
            price,
        } = req.body;

        // Validate required fields
        if (
            !hostId ||
            !title ||
            !location ||
            !bedroomCount ||
            !bathroomCount ||
            !maxGuests ||
            !price
        ) {
            return res
                .status(400)
                .json({ error: "All required fields must be provided" });
        }

        const rent = new Rent(req.body);
        await rent.save();
        await rent.populate("hostId", "-password");

        res.status(201).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a long-term stay
router.put("/:id", async (req, res) => {
    try {
        const rent = await Rent.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate("hostId", "-password");

        if (!rent) {
            return res
                .status(404)
                .json({ message: "Long-term stay not found" });
        }

        res.status(200).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a long-term stay
router.delete("/:id", async (req, res) => {
    try {
        const rent = await Rent.findByIdAndDelete(req.params.id);

        if (!rent) {
            return res
                .status(404)
                .json({ message: "Long-term stay not found" });
        }

        res.status(200).json({
            message: "Long-term stay deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add like to a long-term stay
router.post("/:id/like", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const rent = await Rent.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: userId } },
            { new: true }
        );

        if (!rent) {
            return res
                .status(404)
                .json({ message: "Long-term stay not found" });
        }

        res.status(200).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove like from a long-term stay
router.delete("/:id/unlike/:userId", async (req, res) => {
    try {
        const rent = await Rent.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.params.userId } },
            { new: true }
        );

        if (!rent) {
            return res
                .status(404)
                .json({ message: "Long-term stay not found" });
        }

        res.status(200).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
