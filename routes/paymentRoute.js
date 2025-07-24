const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { requireAuth , isDoctor, isReceptionist} = require('../middlewares/authMiddlewares');

router.get('/payments/:visitId', requireAuth, isReceptionist, paymentController.payment_new_get);

module.exports = router; 