const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rent",
        required: true,
    },
    propertyType: {
        type: String,
        enum: ["long-term", "short-term"],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    title: String,
    comment: String,
    cleanliness: {
        type: Number,
        min: 1,
        max: 5,
    },
    communication: {
        type: Number,
        min: 1,
        max: 5,
    },
    location: {
        type: Number,
        min: 1,
        max: 5,
    },
    accuracy: {
        type: Number,
        min: 1,
        max: 5,
    },
    photos: [String],
    verified: {
        type: Boolean,
        default: false,
    },
    helpful: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Review", reviewSchema);
