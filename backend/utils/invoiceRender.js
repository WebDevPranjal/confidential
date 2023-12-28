const Product = require('../modules/product/schema');

async function processInvoiceProducts(invoiceProducts) {
  const products = [];

  for (let i = 0; i < invoiceProducts.length; i++) {
    const product = await Product.findOne({ name: invoiceProducts[i].name });
    const { discount, invoicerate, quantity, free } = invoiceProducts[i];
    const { name, gst, hsn } = product;
    const foundBatch = product.batches.find((batch) => batch.batch === invoiceProducts[i].batch);
    const { batch, expireDate, packaging, mrp } = foundBatch;

    const data = {
      name: name,
      gst: gst,
      hsn: hsn,
      batch: batch,
      quantity: quantity,
      expireDate: expireDate,
      packaging: packaging,
      mrp: mrp,
      discount: discount,
      rate: invoicerate,
      free: free,
    };
    products.push(data);
  }

  return products;
}

function calculateGSTDetails(products) {
  const gstDetails = {
    fivePercent: { discount: 0, gst: 0 },
    twelvePercent: { discount: 0, gst: 0 },
    eighteenPercent: { discount: 0, gst: 0 },
    total: { discount: 0, gst: 0 },
  };

  products.forEach((product) => {
    const { rate, discount, quantity, gst } = product;

    switch (gst) {
      case 5:
        gstDetails.fivePercent.discount += rate * (discount / 100) * quantity;
        gstDetails.fivePercent.gst += (rate - rate * (discount / 100)) * 0.025 * quantity;
        break;
      case 12:
        gstDetails.twelvePercent.discount += rate * (discount / 100) * quantity;
        gstDetails.twelvePercent.gst += (rate - rate * (discount / 100)) * 0.06 * quantity;
        break;
      case 18:
        gstDetails.eighteenPercent.discount += rate * (discount / 100) * quantity;
        gstDetails.eighteenPercent.gst += (rate - rate * (discount / 100)) * 0.09 * quantity;
        break;
      default:
        break;
    }

    gstDetails.total.discount += rate * (discount / 100) * quantity;
    gstDetails.total.gst += (rate - rate * (discount / 100)) * (gst / 100) * quantity;
  });

  return gstDetails;
}

function calculateTotal(products, gstDetails) {
  let subTotal = 0;

  products.forEach((product) => {
    subTotal += product.quantity * product.rate;
  });

  const total = {
    subTotal: subTotal,
    grandTotal: subTotal - gstDetails.total.discount + gstDetails.total.gst,
  };

  return total;
}

module.exports = { processInvoiceProducts, calculateGSTDetails, calculateTotal };
