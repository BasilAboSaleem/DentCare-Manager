const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');
const { requireAuth , isReceptionist} = require('../middlewares/authMiddlewares');

router.get('/treatments/add', requireAuth, isReceptionist ,treatmentController.add_treatment_get);
router.post('/treatments/add', requireAuth, isReceptionist ,treatmentController.add_treatment_post); 
router.get('/treatments', requireAuth, treatmentController.all_treatments_get);
router.get('/treatments/:id', requireAuth, treatmentController.view_treatment_get);
router.get('/treatments/:id/edit', requireAuth, isReceptionist ,treatmentController.edit_treatment_get);
router.put('/treatments/:id/edit', requireAuth, isReceptionist ,treatmentController.edit_treatment_put);
router.delete('/treatments/:id/delete', requireAuth, isReceptionist ,treatmentController.delete_treatment_delete);

module.exports = router;