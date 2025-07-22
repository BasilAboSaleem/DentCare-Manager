const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { requireAuth } = require('../middlewares/authMiddlewares');

router.get('/appointments/add', requireAuth, appointmentController.add_appointment_get);

module.exports = router;