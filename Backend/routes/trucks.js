const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Truck = require('../models/truck'); // Import the Truck model

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// GET all trucks
router.get('/', async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific truck by ID
router.get('/:id', async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (truck) {
      res.json(truck);
    } else {
      res.status(404).json({ message: 'Truck not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new truck with image upload
router.post('/reg', upload.single('image'), async (req, res) => {
  try {
    const truck = new Truck({
      name: req.body.name,
      location: req.body.location,
      driver: req.body.driver,
      driverImage: req.body.driverImagePath || null, // Use driverImagePath directly
      specifications: req.body.specifications,
      maintenance: req.body.maintenance,
      capacity: req.body.capacity,
      fuelType: req.body.fuelType,
      status: req.body.status,
      image: req.file ? req.file.path.replace(/\\/g, '/') : null, // Handle single image upload
      coordinates: {
        lat: req.body['coordinates.lat'],
        lng: req.body['coordinates.lng']
      },
      licensePlate: req.body.licensePlate,
      year: req.body.year,
      model: req.body.model
    });

    const newTruck = await truck.save();
    res.status(201).json(newTruck);
  } catch (err) {
    console.error('Error while saving truck:', err);
    res.status(400).json({ message: 'Bad Request', error: err.message });
  }
});




// PATCH (update) a specific truck by ID with optional image upload
router.patch('/:id', getTruck, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'driverImage', maxCount: 1 }]), async (req, res) => {
  try {
    if (req.body.location != null) {
      res.truck.location = req.body.location;
    }
    if (req.body.driver != null) {
      res.truck.driver = req.body.driver;
    }
    if (req.files['driverImage']) {
      res.truck.driverImage = req.files['driverImage'][0].path;
    }
    if (req.body.specifications != null) {
      res.truck.specifications = req.body.specifications;
    }
    if (req.body.maintenance != null) {
      res.truck.maintenance = req.body.maintenance;
    }
    if (req.body.capacity != null) {
      res.truck.capacity = req.body.capacity;
    }
    if (req.body.fuelType != null) {
      res.truck.fuelType = req.body.fuelType;
    }
    if (req.body.status != null) {
      res.truck.status = req.body.status;
    }
    if (req.files['image']) {
      res.truck.image = req.files['image'][0].path;
    }
    if (req.body.coordinates != null) {
      res.truck.coordinates = req.body.coordinates;
    }
    if (req.body.licensePlate != null) {
      res.truck.licensePlate = req.body.licensePlate;
    }
    if (req.body.year != null) {
      res.truck.year = req.body.year;
    }
    if (req.body.model != null) {
      res.truck.model = req.body.model;
    }

    const updatedTruck = await res.truck.save();
    res.json(updatedTruck);
  } catch (err) {
    console.error('Error updating truck:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific truck by ID
router.delete('/:id', getTruck, async (req, res) => {
  try {
    await res.truck.remove();
    res.json({ message: 'Truck deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a truck by ID
async function getTruck(req, res, next) {
  let truck;
  try {
    truck = await Truck.findById(req.params.id);
    if (truck == null) {
      return res.status(404).json({ message: 'Cannot find truck' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.truck = truck;
  next();
}

module.exports = router;
