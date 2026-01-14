require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const destinationRoutes = require("./routes/destinations");
const normalStaysRoutes = require("./routes/normalStays");
const longTermStaysRoutes = require("./routes/longTermStays");
const reviewRoutes = require("./routes/reviews");
const bookingRoutes = require("./routes/bookings");
const amenityRoutes = require("./routes/amenities");

const app = express();
const port = process.env.PORT || 3030;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Travel App Backend is Running! 🚀" });
});

// Health check route
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Server is healthy" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/normal-stays", normalStaysRoutes);
app.use("/api/long-term-stays", longTermStaysRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/amenities", amenityRoutes);

// 404 Error handling
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Visit http://localhost:${port} to test`);
    console.log(`API Base URL: http://localhost:${port}/api`);
});
