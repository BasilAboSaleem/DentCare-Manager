const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  visit: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit' }, // Optional
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'card', 'mixed'], required: true },
  paidAt: { type: Date, default: Date.now },
  note: { type: String } // Optional (مثلاً: دفعة على زيارة 3، أو دفعة مسبقة)
});

module.exports = mongoose.model('Payment', paymentSchema);
