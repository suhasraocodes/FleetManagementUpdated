const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  driver: { type: String, required: true },
  driverImage: { type: String },
  specifications: { type: String, required: true },
  maintenance: { type: Date, required: true },
  capacity: { type: Number, required: true },
  fuelType: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  licensePlate: { type: String, required: true },
  year: { type: Number, required: true },
  model: { type: String, required: true }
});

module.exports = mongoose.model('Truck', truckSchema);
