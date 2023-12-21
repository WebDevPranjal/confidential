const express = require('express');
const router = express.Router();
const productController = require('./controller'); 


router.get('/', productController.getAllProducts);
router.post('/create',productController.createProduct);
router.put('/:id', productController.updateProductById);

module.exports = router;
