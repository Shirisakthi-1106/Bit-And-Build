// routes/login.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");


// GET login route
router.get("/", (req, res) => {
  // Get flash messages
  const success_msg = req.flash("success_msg") || [];
  const error_msg = req.flash("error_msg") || [];
  
  // Render login view with messages
  res.render("login", { success_msg, error_msg });
});

// POST login route
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("/login");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("/login");
    }

    // Log in the user (this can include setting session data)
    req.session.userId = user._id; // Store user ID in session

    req.flash("success_msg", "Login successful!");
    res.redirect("/dashboard"); // Redirect to a dashboard or homepage
  } catch (error) {
    console.error("Login error:", error);
    req.flash("error_msg", "An error occurred during login. Please try again.");
    res.redirect("/login");
  }
});

module.exports = router;
