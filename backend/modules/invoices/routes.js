const express = require('express');
const router = express.Router();
const invoiceController = require('./controller');

router.get('/create-purchase', invoiceController.createInvoicePurchase);
router.get('/create-sales', invoiceController.createInvoiceSales);
router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getAllInvoices);

router.get('/:id', invoiceController.getInvoiceById);
router.put('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);


module.exports = router;
