const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password")
            .populate("listedProperties")
            .populate("bookings")
            .populate("reviews");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user by ID
router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Don't allow password updates through this endpoint
        if (updateData.password) {
            return res.status(400).json({
                error: "Cannot update password through this endpoint",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add item to watchlist
router.post("/:id/watchlist", async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ error: "itemId is required" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { watchlist: { id: itemId } } },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove item from watchlist
router.delete("/:id/watchlist/:itemId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { watchlist: { id: req.params.itemId } } },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add like to user's likes
router.post("/:id/likes", async (req, res) => {
    try {
        const { propertyId } = req.body;

        if (!propertyId) {
            return res.status(400).json({ error: "propertyId is required" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likes: propertyId } },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove like from user's likes
router.delete("/:id/likes/:propertyId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.params.propertyId } },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's watchlist
router.get("/:id/watchlist", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("watchlist");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's likes
router.get("/:id/likes", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("likes");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
