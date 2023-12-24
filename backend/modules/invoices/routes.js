const express = require('express');
const router = express.Router();
const invoiceController = require('./controller');
const productController = require('../product/controller');

router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getAllInvoices);
router.get('/create-purchase', async (req, res) => {
    try {
      const products = await productController.getAllProducts();
      res.render('./invoice/purchase-create', { products, pageTitle: 'Product' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/create-sales', async (req, res) => {
  try {
    const products = await productController.getAllProducts();
    res.render('./invoice/sales-create', { products, pageTitle: 'Product' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', invoiceController.getInvoiceById);
router.put('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);


module.exports = router;
