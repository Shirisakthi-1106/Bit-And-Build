const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    registrationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration', // Ensure this matches your Registration model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Adjust if you have a User model
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
