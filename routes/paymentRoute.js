const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { requireAuth , isDoctor, isReceptionist} = require('../middlewares/authMiddlewares');

router.get('/payments-new/:visitId', requireAuth, isReceptionist, paymentController.payment_new_get);
router.post('/payments-new/:visitId', requireAuth, isReceptionist, paymentController.payment_new_post);
router.get('/patients/:patientId/payments', requireAuth, paymentController.patient_payments_get);
router.get('/payments/:paymentId', paymentController.payment_view_get);

module.exports = router; 