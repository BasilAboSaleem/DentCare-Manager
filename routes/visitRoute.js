const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const visitControoler = require('../controllers/visitController');
const { requireAuth , isDoctor} = require('../middlewares/authMiddlewares');


router.get('/visits/start/:appointmentId', requireAuth, isDoctor, visitControoler.start_visit_get);
router.post('/visits/start/:appointmentId', requireAuth, isDoctor, upload.single('xrayImage'), visitControoler.start_visit_post);
router.get('/visits', requireAuth, visitControoler.all_visits_get);
router.get('/visits/today', requireAuth, visitControoler.today_visits_get);
router.get('/visits/:visitId', requireAuth, visitControoler.view_visit_get);
router.get('/patients/:patientId/visits', requireAuth, visitControoler.patient_visits_get);
router.get('/visits/edit/:visitId', requireAuth, isDoctor, visitControoler.edit_visit_get);


module.exports = router;