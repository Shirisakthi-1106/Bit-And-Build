const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration'); // Update with your actual Registration model

// Middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

// Route to get all events registered by the user
router.get('/my-events', isLoggedIn, async (req, res) => {
    try {
        const registrations = await Registration.find({ userId: req.session.userId }).populate('eventId'); // Adjust the field names as necessary
        res.render('my-events', { registrations });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.render('my-events', { registrations: [], error_msg: 'Error fetching registrations.' });
    }
});

module.exports = router;
