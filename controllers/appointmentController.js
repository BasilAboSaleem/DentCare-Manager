const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

exports.add_appointment_get = async (req, res) => {
  try {
    // Fetch all doctors and patients to populate the form
    const doctors = await User.find({ role: 'doctor' });
    const patients = await Patient.find();

    res.render('pages/appointment/new-appointment', {
      title: 'Add New Appointment',
      doctors,
      patients
    });
  } catch (error) {
    console.error('Error fetching doctors or patients:', error);
    res.status(500).send('Internal Server Error');
  }
}