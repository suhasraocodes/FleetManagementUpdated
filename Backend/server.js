const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;
const trucksRouter = require('./routes/trucks');

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://suhas:suhas2244@cluster0.nhaclgq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use('/trucks', trucksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
