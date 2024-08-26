const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  driverImage: {
    type: String, // Store the path to the image as a string
  },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
