const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');


exports.index_get = async (req, res) => {
  try{
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);

    const endOfDay = new Date();
    endOfDay.setHours(23,59,59,999);

    const appointments = await Appointment.find({
      appointmentDate: { $gte: startOfDay, $lte: endOfDay }
    })
    .populate('patient', 'name')
    .populate('doctor', 'name');

    res.render('index', {
      title: 'Dashboard',
      appointments
    });

  
  }catch (error) {
    console.error('Error fetching index page:', error);
    res.status(500).render('pages/error/error-500', {
      title: 'Internal Server Error'
    });
  }
};
 