const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.currentMonthInvoice);
router.post('/product', controller.productWiseSales);
router.get('/product', controller.prodcutWiseSalesPage);
router.post('/customer', controller.customerWiseSales);
router.get('/customer', controller.customerWiseSalesPage);

module.exports = router;
