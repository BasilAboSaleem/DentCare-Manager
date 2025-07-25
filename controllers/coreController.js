const { startOfDay, endOfDay, subDays } = require('date-fns');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');

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

exports.edit_profile_get = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).render('pages/error/error-404', {
        title: 'User Not Found'
      });
    }

    res.render('pages/profile/edit-profile', {
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

exports.edit_profile_put = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password, confirmPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).render('pages/error/error-404', {
        title: 'User Not Found'
      });
    }

    // تحديث الاسم والبريد
    user.name = name?.trim() || user.name;
    user.email = email?.trim().toLowerCase() || user.email;

    // إذا المستخدم قدّم كلمة مرور جديدة
    if (password) {
      if (password !== confirmPassword) {
        req.flash('error', 'Password and confirmation do not match');
        return res.redirect('/edit-profile');
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    req.flash('success', 'Profile updated successfully');
    res.redirect('/edit-profile');
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).render('pages/error/error-500', {
      title: 'Internal Server Error'
    });
  }
};

