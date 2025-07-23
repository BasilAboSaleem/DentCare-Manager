const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { requireAuth, checkIfUser , isReceptionist} = require('../middlewares/authMiddlewares');


router.get("/Patients", requireAuth, patientController.all_patients_get );
router.get('/Patients/add', requireAuth, isReceptionist ,patientController.add_patient_get);
router.post('/Patients/add', requireAuth, isReceptionist ,patientController.add_patient_post);
router.get('/patients/:id', requireAuth, patientController.view_patient_get);
router.get('/patients/:id/edit', requireAuth, isReceptionist ,patientController.edit_patient_get); 
router.put('/patients/:id/edit', requireAuth, isReceptionist ,patientController.edit_patient_put);
router.delete('/patients/:id/delete', requireAuth, isReceptionist ,patientController.delete_patient_delete);

module.exports = router;