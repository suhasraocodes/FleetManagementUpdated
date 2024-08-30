const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Import routes
const trucksRouter = require('./routes/trucks');
const driversRouter = require('./routes/drivers'); // Import the drivers route

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors());

// Use routes
app.use('/trucks', trucksRouter);
app.use('/drivers', driversRouter); // Add the drivers route

// MongoDB connection
mongoose.connect('mongodb+srv://suhas:suhas2244@cluster0.nhaclgq.mongodb.net/mydatabase', {
  // Removed deprecated options
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
