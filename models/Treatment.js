const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Treatment', treatmentSchema);
