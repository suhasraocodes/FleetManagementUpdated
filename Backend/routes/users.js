// routes/users.js
const express = require('express');
const User = require('../models/user'); // Import the User model
const router = express.Router();

router.post('/register', async (req, res) => {
  const { uid, email, password } = req.body;

  try {
    const newUser = new User({ uid, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

module.exports = router;
