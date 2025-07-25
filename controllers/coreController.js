const { startOfDay, endOfDay, subDays } = require('date-fns');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

exports.index_get = async (req, res) => {
  try {
    // تحديد بداية ونهاية اليوم
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    // الإحصائيات
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: { $gte: todayStart, $lte: todayEnd }
    });
    const emergencyCases = await Appointment.countDocuments({ caseType: 'emergency' });
    const completedVisits = await Appointment.countDocuments({ status: 'completed' });
    const newPatientsCount = await Patient.countDocuments({
      createdAt: { $gte: subDays(new Date(), 7) } // آخر 7 أيام
    });

    // مواعيد اليوم
    const appointments = await Appointment.find({
      appointmentDate: { $gte: todayStart, $lte: todayEnd }
    })
      .populate('patient', 'name')
      .populate('doctor', 'name');

    // عرض الصفحة
    res.render('index', {
      title: 'Dashboard',
      appointments,
      stats: {
        totalPatients,
        totalAppointments,
        todayAppointments,
        emergencyCases,
        completedVisits,
        newPatientsCount
      }
    });
  } catch (error) {
    console.error('Error fetching index page:', error);
    res.status(500).render('pages/error/error-500', {
      title: 'Internal Server Error'
    });
  }
};

exports.profile_get = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).render('pages/error/error-404', {
        title: 'User Not Found'
      });
    }

    res.render('pages/profile/profile', {
      title: 'Profile',
      user
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).render('pages/error/error-500', {
      title: 'Internal Server Error'
    });
  }
}
