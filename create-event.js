const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Adjust the path to your Event model
const flash = require("connect-flash");

// GET create event page
router.get("/", (req, res) => {
    const success_msg = req.flash("success_msg") || [];
    const error_msg = req.flash("error_msg") || [];
    res.render("create-event", { success_msg, error_msg }); // Pass the messages to the view
});

// POST create event
router.post("/", async (req, res) => {
    const { title, date, location, description } = req.body;

    try {
        const newEvent = new Event({
            title,
            date,
            location,
            description,
            organizer: req.session.userId, // Assuming userId is stored in session
        });
        await newEvent.save();
        req.flash("success_msg", "Event created successfully!");
        res.redirect("/dashboard"); // Redirect to dashboard after creation
    } catch (error) {
        console.error("Error creating event:", error);
        req.flash("error_msg", "An error occurred while creating the event.");
        res.redirect("/create-event");
    }
});

module.exports = router;
