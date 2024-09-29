const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Ensure this points to your Event model
const Registration = require("../models/Registration"); // Create this model for storing registrations

// GET event registration page
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        // Pass success_msg and error_msg to the view
        const success_msg = req.flash("success_msg") || [];
        const error_msg = req.flash("error_msg") || [];
        res.render("event-registration", { event, success_msg, error_msg });
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).send("Server error");
    }
});

// POST event registration
router.post("/:id/register", async (req, res) => {
    const { slots } = req.body; // Get the number of slots from the form
    const eventId = req.params.id;

    // Create a new registration record
    const registration = new Registration({
        eventId,
        slots,
        userId: req.session.userId, // Assume you have user ID in session
    });

    try {
        await registration.save();
        req.flash("success_msg", "Registration successful!");
        res.redirect("/my-events"); // Redirect to My Events page after successful registration
    } catch (error) {
        console.error("Error saving registration:", error);
        req.flash("error_msg", "Error registering for the event. Please try again.");
        res.redirect(`/event/${eventId}`); // Redirect back to registration page on error
    }
});

// GET My Events Page
router.get("/my-events", async (req, res) => {
    try {
        const registrations = await Registration.find({ userId: req.session.userId })
            .populate('eventId'); // Populate event details if needed

        res.render("my-events", { registrations }); // Render the my-events template
    } catch (error) {
        console.error("Error fetching events:", error);
        res.render("my-events", {
            error_msg: 'Error fetching events. Please try again later.',
        });
    }
});

module.exports = router; 
