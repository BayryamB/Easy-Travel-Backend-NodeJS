const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    description: String,
    photos: [String],
    cover: String,
    discount: Number,
    price: Number,
    guide: String,
    rating: Number,
    overview: String,
    likes: [String],
    comments: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Destination", destinationSchema);
