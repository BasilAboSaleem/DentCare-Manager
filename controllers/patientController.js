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