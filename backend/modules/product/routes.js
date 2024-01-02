const express = require('express');
const router = express.Router();
const productController = require('./controller'); 

router.get('/', productController.getAllProducts);
router.get('/create',productController.createProductPage);
router.post('/create',productController.createProduct);
router.post('/create/batch',productController.createBatch);
router.put('/:id', productController.updateProductById);


module.exports = router;
