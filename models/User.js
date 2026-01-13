const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    firstName: String,
    lastName: String,
    phone: String,
    profilePicture: String,
    bio: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    },
    isHost: {
        type: Boolean,
        default: false,
    },
    hostRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isSuperhost: {
        type: Boolean,
        default: false,
    },
    paymentMethods: [
        {
            cardNumber: String,
            cardHolder: String,
            expiryDate: String,
            isDefault: Boolean,
        },
    ],
    listedProperties: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rent",
        },
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
    watchlist: [{}],
    likes: [String],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
