const Customer = require('../../modules/customer/schema');
const invoiceRenderUtil = require('../invoiceRender');

const getRequiredInvoices = async (invoices) => {
    const reqMonth = 11;
    const reqYear = 2023;
    const processedInvoices = [];
  
    for (const invoice of invoices) {
      if (
        invoice.date.getMonth() === reqMonth &&
        invoice.date.getFullYear() === reqYear &&
        invoice.type === 'sales'
      ) {
        const processedInvoice = await processInvoice(invoice);
        processedInvoices.push(processedInvoice);
      }
    }
  
    return processedInvoices;
};

const processInvoice = async (invoice) => {
    const gst = {
      five: 0,
      twelve: 0,
      eighteen: 0,
    };
  
    let invoiceValue = 0;
  
    const products = await invoiceRenderUtil.processInvoiceProducts(invoice.products);
    const customer = await Customer.findOne({ name: invoice.customerName });
  
    products.forEach((product) => {
      switch (product.gst) {
        case 12:
          gst.twelve += calculateProductAmount(product);
          break;
        case 5:
          gst.five += calculateProductAmount(product);
          break;
        case 18:
          gst.eighteen += calculateProductAmount(product);
          break;
      }
  
      invoiceValue += calculateProductAmount(product);
    });
  
    return {
      customerName: invoice.customerName,
      gstNumber: customer.gstnNumber,
      gst,
      date: invoice.date,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoiceValue,
    };
  };
  
const calculateProductAmount = (product) => {
    return (
      product.quantity * product.rate -
      (product.quantity * product.rate * (product.discount / 100))
    );
};

module.exports = { getRequiredInvoices }
  