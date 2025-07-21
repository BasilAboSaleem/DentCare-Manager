const Patient = require("../models/Patient")

exports.all_patients_get= async (req, res) => {
    try{
        const patients = await Patient.find();
        if(!patients){
            new Patient();
        }
        res.render("pages/patients/all-patients", {patients})

    }
    catch (err) {
    console.error("Error logging in:", err);
    res.status(500).render('pages/error/error-500', {
      title: 'Server Error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}