const express = require('express');
const router = express.Router();
const destinationCtrl = require('../controllers/destinations');

// POST /flights/:id/reviews 
router.post('/flights/:id/destinations', destinationCtrl.create);

module.exports = router;