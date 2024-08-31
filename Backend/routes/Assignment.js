const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment'); // Adjust the path as necessary

// Create a new assignment
router.post('/assignments', async (req, res) => {
    const { driverId, pickupLocation, destinationLocation, pickupDate, deliveryDate } = req.body;

    // Validate required fields
    if (!driverId || !pickupLocation || !destinationLocation || !pickupDate || !deliveryDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const assignment = new Assignment({
        driver: driverId,
        pickupLocation,
        destinationLocation,
        pickupDate,
        deliveryDate,
    });

    try {
        const newAssignment = await assignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all assignments for a specific driver, sorted by most recent pickupDate
router.get('/driver/:driverId', async (req, res) => {
    const { driverId } = req.params;

    try {
        const assignments = await Assignment.find({ driver: driverId })
            .sort({ pickupDate: -1 }) // Sort by pickupDate in descending order
            .exec();

        if (!assignments.length) { // Check for empty array
            return res.status(404).json({ message: 'No assignments found for this driver.' });
        }

        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
