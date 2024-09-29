// routes/verify-email.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Adjust the path as needed

// GET verify-email route
router.get("/", async (req, res) => {
  const { token } = req.query;

  try {
    // Find user by email token
    const user = await User.findOne({ emailToken: token });
    
    if (!user) {
      req.flash("error_msg", "Invalid or expired token.");
      return res.redirect("/signup");
    }

    // Verify user and remove the token
    user.isVerified = true;
    user.emailToken = undefined; // Clear the token
    await user.save();

    req.flash("success_msg", "Email verified successfully! You can now log in.");
    res.redirect("/login");
  } catch (error) {
    console.error("Email verification error:", error);
    req.flash("error_msg", "An error occurred during email verification. Please try again.");
    res.redirect("/signup");
  }
});

module.exports = router;
