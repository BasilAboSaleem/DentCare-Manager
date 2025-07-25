const express = require('express');
const router = express.Router();
const coreController = require('../controllers/coreController');
const { requireAuth, checkIfUser } = require('../middlewares/authMiddlewares');

router.get('/', requireAuth, coreController.index_get);
router.get('/profile', requireAuth, coreController.profile_get);


module.exports = router; 