const Visit = require('../models/Visit');
const Patient = require('../models/Patient');
const Treatment = require('../models/Treatment');
const Appointment = require('../models/Appointment');
const cloudinary = require('cloudinary').v2;

 // Configuration cloudinary اعدادات الكلاودنري
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


exports.start_visit_get = async (req, res) => {
  const { appointmentId } = req.params;

  try {
   const appointment = await Appointment.findById(appointmentId).populate('patient');
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
};

exports.start_visit_post = async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const {
      diagnosis,
      treatment,
      treatments,
      extraFees = 0,
      additionalFeeReason,
      discount = 0,
      notes,
    } = req.body;

    const treatmentIds = Array.isArray(treatments) ? treatments : treatments ? [treatments] : [];

    const selectedTreatments = await Treatment.find({ _id: { $in: treatmentIds } });

    if (selectedTreatments.length !== treatmentIds.length) {
      return res.status(400).send('Some treatments are invalid');
    }

    const extraFeesNum = Number(extraFees) || 0;
    const discountNum = Number(discount) || 0;

    const treatmentsTotal = selectedTreatments.reduce((sum, t) => sum + t.price, 0);
    const totalAmount = Math.max(0, treatmentsTotal + extraFeesNum - discountNum);

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      
      console.error('Appointment not found:', appointmentId);
      return res.status(404).render('pages/error/error-404', { title: 'Error', message: 'Appointment not found' });
    }

    let xrayImageUrl = '';
    if (req.file) {
      // رفع الصورة إلى Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'dentcare/xray-images',
        use_filename: true,
        unique_filename: false,
      });
      xrayImageUrl = uploadResult.secure_url;
    }

    const visit = new Visit({
      patient: appointment.patient,
      doctor: appointment.doctor,
      appointment: appointment._id,
      treatments: treatmentIds,
      diagnosis,
      treatment,
      extraFees: extraFeesNum,
      additionalFeeReason,
      discount: discountNum,
      totalAmount,
      paidAmount: 0,
      paymentStatus: 'unpaid',
      notes,
      xrayImageUrl, // رابط الصورة المحملة
    });

    await visit.save();

    appointment.status = 'completed';
    await appointment.save();
    req.flash('success', 'Visit started successfully');
    //res.redirect('/visits/' + visit._id);
    res.redirect('/')
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/error/error-500', { title: 'Error', message: 'Failed to start visit' });
  }
};


    
 