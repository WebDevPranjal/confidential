const Invoice = require('./schema');
const updateStock = require('../../utils/updateStock');

exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();

    for (const product of invoice.products) {
      const productName = product.name;
      const productQty = product.quantity;
      const productBatch = product.batch;

      // console.log("Product Name:", productName);
      // console.log("Batch:", productBatch);
      // console.log("------");

      await updateStock.updateStock(productName, productBatch, productQty,0);
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

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
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
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  
      // Check if the invoice exists
      const existingInvoice = await Invoice.findById(invoiceId);
  
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
  
  