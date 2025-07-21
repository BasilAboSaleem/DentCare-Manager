const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { requireAuth, checkIfUser } = require('../middlewares/authMiddlewares');


router.get("/Patients", requireAuth, patientController.all_patients_get )

module.exports = router;