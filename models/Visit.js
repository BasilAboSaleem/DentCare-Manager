const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
   treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Treatment' }],

  visitDate: { type: Date, default: Date.now },
  diagnosis: { type: String, trim: true },
  treatment: { type: String, trim: true },
  notes: { type: String, trim: true },
  xrayImageUrl: { type: String, trim: true }, // رابط صورة الأشعة لو في
  extraFees: { type: Number, default: 0 }, 
  additionalFeeReason: { type: String, trim: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 }, 
paidAmount: { type: Number, default: 0 },  
paymentStatus: {                           
  type: String,
  enum: ['unpaid', 'partial', 'paid'],
  default: 'unpaid'
}
});

module.exports = mongoose.model('Visit', visitSchema);
