const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const e = require('connect-flash');

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

exports.add_appointment_post = async (req, res) => {
  const { patient, doctor, appointmentDate, caseType, notes } = req.body;

  try {
    // Create a new appointment
    const newAppointment = new Appointment({
      patient,
      doctor,
      caseType,
      appointmentDate: caseType === 'emergency' ? new Date() : new Date(appointmentDate),
      notes
    });

    await newAppointment.save();

    req.flash('success', 'Appointment created successfully!');
    res.redirect('/');
  } catch (error) {
    console.error('Error creating appointment:', error);
    req.flash('error', 'Failed to create appointment. Please try again.');
    res.redirect('/appointments/add');
  }
}

exports.all_appointments_get = async (req, res) => {
  try {
    // Fetch all appointments with populated patient and doctor details
    const appointments = await Appointment.find()
      .populate('patient', 'name');

    res.render('pages/appointment/all-appointments', {
      title: 'All Appointments',
      appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Internal Server Error');
  }
}

exports.view_appointment_get = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    // Fetch the appointment by ID and populate patient and doctor details
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'name')
      .populate('doctor', 'name');

    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }

    res.render('pages/appointment/view-appointment', {
      title: 'View Appointment',
      appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).send('Internal Server Error');
  }
}
