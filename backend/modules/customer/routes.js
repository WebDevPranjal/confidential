const express = require('express');
const router = express.Router();

const customerController = require('./controller');

router.get('/create',customerController.createCustomerPage);
router.get('/', customerController.getAllCustomers);
router.post('/create', customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;