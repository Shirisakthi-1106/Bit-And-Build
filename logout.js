// routes/logout.js
const express = require("express");
const router = express.Router();

// GET logout route
router.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      req.flash("error_msg", "Error logging out. Please try again.");
      return res.redirect("/dashboard");
    }
    req.flash("success_msg", "You have logged out successfully.");
    res.redirect("/login");
  });
});

module.exports = router;
