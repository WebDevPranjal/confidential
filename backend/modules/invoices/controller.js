const Invoice = require('./schema');
const updateStock = require('../../utils/updateStock');
const Customer = require('../customer/schema');
const Product = require('../product/schema');
const invoiceUtils = require('../../utils/invoiceRender');
const numberToWords = require('number-to-words');

exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    const { type } = req.body;
    await invoice.save();


    for (const product of invoice.products) {
      const productName = product.name;
      const productQty = product.quantity;
      const productBatch = product.batch;
      const freeQty = product.free;

      // console.log("Product Name:", productName);
      // console.log("Batch:", productBatch);
      // console.log("------");
      if(type == 'sales') {
        await updateStock.updateStockSales(productName, productBatch, productQty,freeQty);
      }
      else if(type == 'purchase'){
        await updateStock.updateStockPurchase(productName, productBatch, productQty,freeQty);
      }
    }

    res.status(201).json(invoice);
  } catch (error) {
    console.error(error);
    if (error.message === 'Product not found' || error.message === 'Batch not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.createInvoicePurchase = async (req,res) => {
  try {
    const products = await Product.find();
    res.render('./invoice/purchase-create', { products, pageTitle: 'Product' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.createInvoiceSales = async (req,res) => {
  try {
    const products = await Product.find();
    res.render('./invoice/sales-create', { products, pageTitle: 'Product' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
   res.render('./invoice/invoice-list',{ invoices });
   // res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const customer = await Customer.findOne({ name: invoice.customerName });
    const products = await invoiceUtils.processInvoiceProducts(invoice.products);
    const gstDetails = invoiceUtils.calculateGSTDetails(products);
    const total = invoiceUtils.calculateTotal(products, gstDetails);
    const totalInWords = numberToWords.toWords(total.grandTotal.toFixed(0));
   
    res.render('./invoice-template/invoice-template', {invoice, customer , products, gstDetails,total,totalInWords });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update invoice is not completed
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the invoice by ID
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const quantityArray = invoice.products.map(product => product.quantity);

    // console.log('Quantity Array:', quantityArray);

    // Find the invoice by ID and update it
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Update product stock for each product in the updated invoice
    for (let i = 0; i < updatedInvoice.products.length; i++) {
      const product = updatedInvoice.products[i];
      const productName = product.name;
      const productQty = product.quantity;
      const productBatch = product.batch;
      const billingQty = quantityArray[i];

      // console.log("Product Name:", productName);
      // console.log("Batch:", productBatch);
      // console.log("------");

      // Call the updateStock function to update stock
      await updateStock.updateStock(productName, productBatch, productQty, billingQty);
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
    try {
      const invoiceId = req.params.id;

      const existingInvoice = await Invoice.findById(invoiceId);
      const { type } = existingInvoice;
      
      for (const product of existingInvoice.products) {
        const productName = product.name;
        const productQty = product.quantity;
        const productBatch = product.batch;
        const freeQty = product.free;

        if(type == 'sales') {
          await updateStock.updateStockSalesOnDelete(productName, productBatch, productQty,freeQty);
        }
        else if(type == 'purchase'){
          await updateStock.updateStockPurchaseOnDelete(productName, productBatch, productQty,freeQty);
        }
      }

      if (!existingInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      // Delete the invoice by ID using deleteOne
      await Invoice.deleteOne({ _id: invoiceId });
  
      res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
  
  