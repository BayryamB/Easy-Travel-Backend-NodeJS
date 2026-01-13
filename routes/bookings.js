const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Get all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("propertyId", "title cover")
            .populate("guestId", "username email")
            .populate("hostId", "username email");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get bookings by guest ID
router.get("/guest/:guestId", async (req, res) => {
    try {
        const bookings = await Booking.find({ guestId: req.params.guestId })
            .populate("propertyId", "title cover")
            .populate("hostId", "username email")
            .sort({ checkInDate: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get bookings by host ID
router.get("/host/:hostId", async (req, res) => {
    try {
        const bookings = await Booking.find({ hostId: req.params.hostId })
            .populate("propertyId", "title cover")
            .populate("guestId", "username email")
            .sort({ checkInDate: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single booking by ID
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("propertyId")
            .populate("guestId", "username email phone")
            .populate("hostId", "username email phone");

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new booking
router.post("/", async (req, res) => {
    try {
        const {
            propertyId,
            guestId,
            hostId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            pricing,
        } = req.body;

        // Validate required fields
        if (
            !propertyId ||
            !guestId ||
            !hostId ||
            !checkInDate ||
            !checkOutDate ||
            !numberOfGuests ||
            !pricing ||
            !pricing.total
        ) {
            return res
                .status(400)
                .json({ error: "All required fields must be provided" });
        }

        // Check if dates are valid
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkIn >= checkOut) {
            return res
                .status(400)
                .json({ error: "Check-out date must be after check-in date" });
        }

        // Calculate number of nights
        const numberOfNights = Math.ceil(
            (checkOut - checkIn) / (1000 * 60 * 60 * 24)
        );

        const booking = new Booking({
            ...req.body,
            numberOfNights,
            status: "pending",
        });

        await booking.save();
        await booking.populate("propertyId", "title cover");
        await booking.populate("guestId", "username email");
        await booking.populate("hostId", "username email");

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a booking
router.put("/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate("propertyId", "title cover")
            .populate("guestId", "username email")
            .populate("hostId", "username email");

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Confirm a booking
router.post("/:id/confirm", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: "confirmed" },
            { new: true }
        )
            .populate("propertyId", "title cover")
            .populate("guestId", "username email")
            .populate("hostId", "username email");

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Complete a booking
router.post("/:id/complete", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: "completed" },
            { new: true }
        )
            .populate("propertyId", "title cover")
            .populate("guestId", "username email")
            .populate("hostId", "username email");

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancel a booking
router.post("/:id/cancel", async (req, res) => {
    try {
        const { cancellationReason, refundAmount } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                status: "cancelled",
                cancellationReason,
                cancellationDate: new Date(),
                refundAmount,
            },
            { new: true }
        )
            .populate("propertyId", "title cover")
            .populate("guestId", "username email")
            .populate("hostId", "username email");

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a booking
router.delete("/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
