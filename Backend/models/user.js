// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Assuming you want to store passwords (consider using hashing)
});

module.exports = mongoose.model('User', userSchema);
