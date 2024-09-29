const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Organizer = require("../models/Organizer"); // Adjust the path if needed
const flash = require("connect-flash");

// GET organizer login route
router.get("/", (req, res) => {
  const success_msg = req.flash("success_msg") || [];
  const error_msg = req.flash("error_msg") || [];
  res.render("organizer-login", { success_msg, error_msg });
});

// POST organizer login route
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find organizer by email
    const organizer = await Organizer.findOne({ email });

    if (!organizer) {
      req.flash("error_msg", "Invalid email or password.");
      return res.redirect("/organizer-login");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, organizer.password);
    if (!isMatch) {
      req.flash("error_msg", "Invalid email or password.");
      return res.redirect("/organizer-login");
    }

    // Log in the organizer
    req.session.userId = organizer._id; // Store organizer ID in session
    req.flash("success_msg", "Login successful!");
    res.redirect("/create-event"); // Redirect to the Create Event page
  } catch (error) {
    console.error("Organizer login error:", error);
    req.flash("error_msg", "An error occurred during login. Please try again.");
    res.redirect("/organizer-login");
  }
});

module.exports = router;
