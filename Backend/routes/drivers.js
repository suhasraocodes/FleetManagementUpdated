const express = require('express');
const multer = require('multer');
const Driver = require('../models/drivers');

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/drivers'); // Directory where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});
const upload = multer({ storage: storage });

// Register a new driver
router.post('/reg', upload.single('driverImage'), async (req, res) => {
  try {
    const { name, contactInfo, licenseNumber } = req.body;

    // Check if a driver with the same license number already exists
    const existingDriver = await Driver.findOne({ licenseNumber });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver with this license number already exists.' });
    }

    // Create a new driver
    const newDriver = new Driver({
      name,
      contactInfo,
      licenseNumber,
      driverImage: req.file ? req.file.path : null, // Save the image path if an image is uploaded
    });

    await newDriver.save();
    res.status(201).json({ message: 'Driver registered successfully', driver: newDriver });
  } catch (error) {
    console.error('Error registering driver:', error);
    res.status(500).json({ message: 'Failed to register driver' });
  }
});

// Fetch all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Failed to fetch drivers' });
  }
});

module.exports = router;
