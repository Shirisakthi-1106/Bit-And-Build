const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// POST signup route
router.post("/", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Password strength check
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    req.flash("error_msg", "Invalid password format.");
    return res.redirect("/signup");
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    req.flash("error_msg", "Passwords do not match");
    return res.redirect("/signup");
  }

  try {
    // Create verification token
    const emailToken = crypto.randomBytes(32).toString("hex");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      emailToken,
      isVerified: false,
    });

    // Attempt to save the user
    await user.save();

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "shirisakthi2310127@ssn.edu.in", // Your email
        pass: "fftp oqgl ahif iqsy", // Your email password
      },
    });

    // Create verification link
    const verificationLink = `http://localhost:3000/verify-email?token=${emailToken}`;

    // Email options
    const mailOptions = {
      from: `"Event Management" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification",
      html: `<h3>Hello ${username},</h3>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">Verify your email</a>`,
    };

    // Send verification email
    await transporter.sendMail(mailOptions);

    // Set success message and redirect
    req.flash(
      "success_msg",
      "Signup successful! Please check your email to verify your account."
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    req.flash(
      "error_msg",
      "An error occurred during signup. Please try again."
    );
    res.redirect("/signup");
  }
});

// GET signup route
router.get("/", (req, res) => {
  res.render("signup", {
    success_msg: req.flash("success_msg"), // Pass success message
    error_msg: req.flash("error_msg"), // Pass error message
  });
});

module.exports = router;
