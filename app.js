const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");
const logoutRoutes = require("./routes/logout");
const organizerLoginRoutes = require("./routes/organizer-login");
const Organizer = require("./models/Organizer");
const createEventRoutes = require("./routes/create-event");
const eventRegistrationRoutes = require("./routes/event-registration");
const myEventsRoutes = require("./routes/my-events");
const feedbackRoutes = require("./routes/feedback"); // Ensure this is the correct path for feedback
const submitFeedbackRoutes = require("./routes/submit-feedback"); // This can be used for submitting feedback

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ secret: "your_secret", resave: false, saveUninitialized: true })
);
app.use(flash());
app.use(express.static("public"));
app.set("view engine", "ejs");

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/event-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
  })
  .then(async () => {
    console.log("MongoDB connected");

    // Insert sample organizers
    await Organizer.insertSampleRecords();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.render("welcome");
});

// User-related routes
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/logout", logoutRoutes);

// Organizer-related routes
app.use("/organizer-login", organizerLoginRoutes);
app.use("/create-event", createEventRoutes);

// Event-related routes
app.use("/event", eventRegistrationRoutes);
app.use("/my-events", myEventsRoutes);

// Feedback-related routes
app.use("/feedback", feedbackRoutes); // Use feedback routes
app.use("/submit-feedback", submitFeedbackRoutes); // Submit feedback route

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
