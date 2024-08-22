const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String // Assuming this will store the URL of the image
    },
    location: {
        type: String,
        required: true
    },
    truck: {
        type: String,
        required: true
    },
    licensePlate: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    coordinates: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    }
});

// Create truck model
const user = mongoose.model('user', userSchema);

module.exports = user;
