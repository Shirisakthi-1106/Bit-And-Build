


const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Adjust if you have a specific User model
        required: true
    },
    slots: {
        type: Number,
        required: true,
        min: 1 // Ensure at least 1 slot is selected
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;

