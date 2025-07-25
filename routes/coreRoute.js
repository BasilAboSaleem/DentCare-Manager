const express = require('express');
const router = express.Router();
const coreController = require('../controllers/coreController');
const { requireAuth, checkIfUser } = require('../middlewares/authMiddlewares');

router.get('/', requireAuth, coreController.index_get);
router.get('/edit-profile', requireAuth, coreController.edit_profile_get);
router.put('/edit-profile', requireAuth, coreController.edit_profile_put);



module.exports = router; 