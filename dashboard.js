const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Adjust the path to your Event model

// GET dashboard route
router.get("/", async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find(); 
    res.render("dashboard", { events }); // Pass events to the view
  } catch (error) {
    console.error("Error fetching events:", error);
    res.render("dashboard", { events: [] }); // Render with empty events on error
  }
});

module.exports = router;
