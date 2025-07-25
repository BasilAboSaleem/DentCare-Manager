const Payment = require('../models/Payment');
const Visit = require('../models/Visit');
const Patient = require('../models/Patient');


exports.payment_new_get = async (req, res) => {
    const visitId = req.params.visitId;
    try {
        // Fetch the visit details using the visitId
        const visit = await Visit.findById(visitId).populate('patient doctor');
        if (!visit) {
            return res.status(404).render('pages/error/error-404', { title: 'Error', message: 'Visit not found' });
        }

        // Render the payment page with visit details
        res.render('pages/payments/new-payment', { visit });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.payment_new_post = async (req, res) => {
  const visitId = req.params.visitId;
  const { amount, method, note } = req.body;

  try {
    if (!amount || !method) {
      req.flash('error', 'Please fill in all required fields');
      return res.redirect(`/payments/${visitId}`);
    }

    const visit = await Visit.findById(visitId);
    if (!visit) {
      req.flash('error', 'Visit not found');
      return res.redirect('/visits');
    }

    const patient = await Patient.findById(visit.patient);

    const numericAmount = Number(amount);

    const payment = new Payment({
      patient: patient._id,
      visit: visitId,
      amount: numericAmount,
      method,
      note
    });

    await payment.save();

    visit.paidAmount += numericAmount;

    if (visit.paidAmount >= visit.totalAmount) {
      visit.paymentStatus = 'paid';
    } else if (visit.paidAmount > 0) {
      visit.paymentStatus = 'partial';
    } else {
      visit.paymentStatus = 'unpaid';
    }

    await visit.save();

    req.flash('success', 'Payment recorded successfully');
    res.redirect(`/payments/${visitId}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/error-500', { title: 'Error', message: 'An error occurred while processing the payment' });
  }
};

exports.patient_payments_get = async (req, res) => {
  const patientId = req.params.patientId;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).render('pages/error/error-404', { title: 'Error', message: 'Patient not found' });
    }

    const payments = await Payment.find({ patient: patientId }).populate('visit');
    res.render('pages/payments/all-payments', { patient, payments });
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/error-500', { title: 'Error', message: 'An error occurred while fetching patient payments' });
  }
};

exports.payment_view_get = async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    const payment = await Payment.findById(paymentId).populate('patient visit');
    if (!payment) {
      return res.status(404).render('pages/error/error-404', { title: 'Error', message: 'Payment not found' });
    }

    res.render('pages/payments/view-payment', { payment });
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/error-500', { title: 'Error', message: 'An error occurred while fetching payment details' });
  }
};

exports.all_payments_get = async (req, res) => {
  try {
    const payments = await Payment.find().populate('patient visit');
    res.render('pages/payments/all-payments', { payments , patient: null });
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/error-500', { title: 'Error', message: 'An error occurred while fetching all payments' });
  }
};

exports.today_payments_get = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // بداية اليوم
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // بداية اليوم التالي

    const payments = await Payment.find({
      paidAt: {
        $gte: today,
        $lt: tomorrow
      }
    }).populate('patient visit');

    res.render('pages/payments/all-payments', { payments, patient: null });
  } catch (error) {
    console.error(error);
    res.status(500).render('pages/error/error-500', { title: 'Error', message: 'An error occurred while fetching today\'s payments' });
  }
};