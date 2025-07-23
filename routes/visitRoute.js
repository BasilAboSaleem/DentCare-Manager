const express = require('express');
const router = express.Router();
const visitControoler = require('../controllers/visitController');
const { requireAuth , isDoctor} = require('../middlewares/authMiddlewares');

router.get('/visits/start/:id', requireAuth, isDoctor, visitControoler.start_visit_get);


module.exports = router;