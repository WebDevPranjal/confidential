const express = require('express');
const router = express.Router();
const gstcontroller = require('./controller')

router.get('/', gstcontroller.gstR1);

module.exports = router;