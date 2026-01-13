const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register endpoint
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Username or email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login endpoint
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res
                .status(400)
                .json({ error: "Username and password are required" });
        }

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
