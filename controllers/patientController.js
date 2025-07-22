const e = require("express");
const Patient = require("../models/Patient")

exports.all_patients_get = async (req, res) => {
  try {
    const query = req.query.q;
    let patients;

    if (query) {
      const regex = new RegExp(query, 'i'); 
      patients = await Patient.find({
        $or: [
          { name: regex },
          { phone: regex }
        ]
      });
    } else {
      patients = await Patient.find();
    }

    res.render("pages/patients/all-patients", { patients, query });
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).render('pages/error/error-500', {
      title: 'Server Error',
      message: 'Something went wrong. Please try again later.'
    });
  }
};


exports.add_patient_get = (req, res) => {
    res.render("pages/patients/add-patient", {
        title: "Add Patient"
    });
}

exports.add_patient_post = async (req, res) => {
  try{
    const { name, phone, address, dateOfBirth, gender, notes } = req.body;
    const newPatient = new Patient({
      name,
      phone,
      address,
      dateOfBirth,
      gender,
      notes
    });
    await newPatient.save();
    req.flash("success", "Patient added successfully");
    res.redirect("/Patients");
  }
  catch (err) {
    console.error("Error adding patient:", err);
    res.status(500).render('pages/error/error-500', {
      title: 'Server Error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}

exports.view_patient_get = async (req, res) => {
  try{
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).render('pages/error/error-404', {
        title: 'Patient Not Found',
        message: 'The patient you are looking for does not exist.'
      });
    }

    res.render('pages/patients/view-patient', {
      title: 'Patient Details',
      patient
    });
  }
  catch (err) {
    console.error("Error fetching patient details:", err);
    res.status(500).render('pages/error/error-500', {
      title: 'Server Error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}

exports.edit_patient_get = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).render('pages/error/error-404', {
        title: 'Patient Not Found',
        message: 'The patient you are trying to edit does not exist.'
      });
    }
    res.render('pages/patients/edit-patient', {
      title: 'Edit Patient',
      patient
    });
  } catch (err) {
    console.error("Error fetching patient details:", err);
    res.status(500).render('pages/error/error-500', {
      title: 'Server Error',
      message: 'Something went wrong. Please try again later.'
    });
  }
};

exports.edit_patient_put = async (req, res) => {
  try {
    const patientId = req.params.id;
    const { name, phone, address, dateOfBirth, gender, notes } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).render('pages/error/error-404', {
        title: 'Patient Not Found',
        message: 'No patient found with the given ID.'
      });
    }

    // تحديث فقط الحقول التي تم تغييرها
    patient.name = name || patient.name;
    patient.phone = phone || patient.phone;
    patient.address = address || patient.address;
    patient.dateOfBirth = dateOfBirth || patient.dateOfBirth;
    patient.gender = gender || patient.gender;
    patient.notes = notes || patient.notes;

    await patient.save();
    
    req.flash("success", "Patient updated successfully");
    res.redirect(`/patients/${patientId}`);
  } catch (err) {
    console.error("Error updating patient:", err);
    res.status(500).render('pages/error/error-500', {
      title: 'Server Error',
      message: 'Something went wrong. Please try again later.'
    });
  }
};
