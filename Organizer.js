// models/Organizer.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const OrganizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Function to insert sample records
OrganizerSchema.statics.insertSampleRecords = async function () {
  const sampleOrganizers = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "password123", // Will be hashed
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "password123", // Will be hashed
    },
    {
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: "password123", // Will be hashed
    },
  ];

  // Check if organizers already exist
  for (const organizer of sampleOrganizers) {
    const existingOrganizer = await this.findOne({ email: organizer.email });
    if (!existingOrganizer) {
      // Hash the password
      organizer.password = await bcrypt.hash(organizer.password, 10);
      // Create and save the new organizer
      await this.create(organizer);
      console.log(`Inserted organizer: ${organizer.name}`);
    }
  }
};

module.exports = mongoose.model("Organizer", OrganizerSchema);
