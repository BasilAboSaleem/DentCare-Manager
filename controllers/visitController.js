const Visit = require('../models/Visit');
const Patient = require('../models/Patient');
const Treatment = require('../models/Treatment');
const Appointment = require('../models/Appointment');

exports.start_visit_get = async (req, res) => {
  const { id } = req.params;

  try {
   const appointment = await Appointment.findById(id).populate('patient');
    if (!appointment || !appointment.patient) {
      req.flash('error', 'Patient not found');
      return res.redirect('/appointments');
    }

    const allTreatments = await Treatment.find();
    res.render('pages/visit/start-visit', { title: 'Start Visit', appointment, patient: appointment.patient, allTreatments });
  } catch (error) {
    console.error("Error starting visit:", error);
    req.flash('error', 'Failed to start visit');
    res.redirect('/patients');
  }
}
    
 