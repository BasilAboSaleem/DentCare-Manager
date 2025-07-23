const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');
const { requireAuth } = require('../middlewares/authMiddlewares');

router.get('/treatments/add', requireAuth, treatmentController.add_treatment_get);
router.post('/treatments/add', requireAuth, treatmentController.add_treatment_post); 
router.get('/treatments', requireAuth, treatmentController.all_treatments_get);

module.exports = router;