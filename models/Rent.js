const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    location: {
        country: String,
        city: String,
        address: String,
        latitude: Number,
        longitude: Number,
    },
    photos: [String],
    cover: String,
    description: String,
    bedroomCount: {
        type: Number,
        required: true,
    },
    bathroomCount: {
        type: Number,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    squareFootage: Number,
    propertyType: {
        type: String,
        enum: ["apartment", "house", "villa", "condo", "room", "other"],
        required: true,
    },
    checkInTime: String,
    checkOutTime: String,
    cancellationPolicy: {
        type: String,
        enum: ["flexible", "moderate", "strict"],
        default: "moderate",
    },
    houseRules: [String],
    amenities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Amenity",
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    pricePerNight: Number,
    discount: Number,
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    likes: [String],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    availability: [
        {
            startDate: Date,
            endDate: Date,
            isAvailable: Boolean,
        },
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Rent", rentSchema);
