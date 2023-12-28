const express = require('express');
const router = express.Router();

const customerController = require('./controller');

router.get('/create',customerController.createCustomerPage);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/create', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;