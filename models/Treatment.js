const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  visit: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Treatment', treatmentSchema);
