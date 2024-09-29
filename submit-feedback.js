const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Ensure you have a Feedback model to save feedback

// Route to handle feedback submission
router.post('/submit-feedback', async (req, res) => {
    const { registrationId, feedback } = req.body;
    try {
        const newFeedback = new Feedback({
            registrationId,
            feedback,
            userId: req.session.userId // Assuming you want to associate feedback with a user
        });
        await newFeedback.save();
        res.redirect('/my-events'); // Redirect to My Events page after submitting feedback
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.render('feedback', { error_msg: 'Error submitting feedback.' });
    }
});

module.exports = router;
