const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { requireAuth, checkIfUser } = require('../middlewares/authMiddlewares');


router.get("/Patients", requireAuth, patientController.all_patients_get );
router.get('/Patients/add', requireAuth, patientController.add_patient_get);
router.post('/Patients/add', requireAuth, patientController.add_patient_post);

module.exports = router;