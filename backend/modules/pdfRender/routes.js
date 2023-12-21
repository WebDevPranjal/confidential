const express = require('express');
const invoiceController = require('./controller');

const router = express.Router();

router.post('/generateInvoicePdf', invoiceController.generateInvoice);

module.exports = router;
