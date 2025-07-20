const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitDate: { type: Date, default: Date.now },
  diagnosis: { type: String, trim: true },
  treatment: { type: String, trim: true },
  notes: { type: String, trim: true },
  xrayImageUrl: { type: String, trim: true } // رابط صورة الأشعة لو في
});

module.exports = mongoose.model('Visit', visitSchema);
