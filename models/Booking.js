const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
    numberOfNights: Number,
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
    pricing: {
        pricePerNight: Number,
        numberOfNights: Number,
        subtotal: Number,
        serviceFee: Number,
        cleaningFee: Number,
        tax: Number,
        total: {
            type: Number,
            required: true,
        },
    },
    specialRequests: String,
    cancellationReason: String,
    cancellationDate: Date,
    refundAmount: Number,
    guestNotes: String,
    hostNotes: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Booking", bookingSchema);
