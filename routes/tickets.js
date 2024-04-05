const express = require('express');
const router = express.Router();
const ticketCtrl = require('../controllers/tickets');


router.post('/flights/:id/tickets/new', ticketCtrl.create);

router.get('/flights/:id/tickets/new', ticketCtrl.new);


module.exports = router;