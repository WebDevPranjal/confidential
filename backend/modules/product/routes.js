const express = require('express');
const router = express.Router();
const productController = require('./controller'); 


router.get('/', productController.getAllProducts);
router.post('/create',productController.createProduct);
router.post('/create/batch',productController.createBatch);
router.put('/:id', productController.updateProductById);

router.get('/item-list', async (req, res) => {
    try {
      const products = await productController.getAllProducts();
      res.render('productPage', { products, pageTitle: 'Product Page' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
