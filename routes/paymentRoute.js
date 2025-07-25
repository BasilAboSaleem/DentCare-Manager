const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { requireAuth , isDoctor, isReceptionist} = require('../middlewares/authMiddlewares');

router.get('/payments/:visitId', requireAuth, isReceptionist, paymentController.payment_new_get);
router.post('/payments/:visitId', requireAuth, isReceptionist, paymentController.payment_new_post);
router.get('/patients/:patientId/payments', requireAuth, paymentController.patient_payments_get);

module.exports = router; 