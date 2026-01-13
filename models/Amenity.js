const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        enum: [
            "wifi",
            "parking",
            "kitchen",
            "entertainment",
            "comfort",
            "safety",
            "cleaning",
            "outdoor",
            "other",
        ],
        required: true,
    },
    icon: String,
    description: String,
    isPopular: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Amenity", amenitySchema);
