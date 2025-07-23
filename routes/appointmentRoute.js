const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { requireAuth , isReceptionist} = require('../middlewares/authMiddlewares');

router.get('/appointments/add', requireAuth, isReceptionist ,appointmentController.add_appointment_get);
router.post('/appointments/add', requireAuth, isReceptionist ,appointmentController.add_appointment_post);
router.get('/appointments', requireAuth, appointmentController.all_appointments_get);
router.get('/appointments/:id', requireAuth, appointmentController.view_appointment_get);
router.get('/appointments/edit/:id', requireAuth, isReceptionist ,appointmentController.edit_appointment_get);
router.put('/appointments/edit/:id', requireAuth, isReceptionist ,appointmentController.edit_appointment_put);
router.delete('/appointments/delete/:id', requireAuth, isReceptionist ,appointmentController.delete_appointment_delete);

module.exports = router;