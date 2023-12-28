const Invoice = require('../../invoices/schema');
const gstR1B2B = require('../../../utils/gst/gstR1B2B');
const gstR1B2C = require('../../../utils/gst/gstR1B2C');
const gstR1HSN = require('../../../utils/gst/gstR1HSN');
const gstR1 = require('../../../utils/gstR1');

exports.gstR1 = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    const requiredInvoicesB2B = await gstR1B2B.getRequiredInvoices(invoices);
    const requiredInvoicesB2C = await gstR1B2C.getRequiredInvoices(invoices);
    const requiredInvoicesHSN = await gstR1HSN.getRequiredInvoices(invoices);

    //gstR1.writeDataToExcelB2B(requiredInvoicesB2B);
    //gstR1.writeDataToExcelB2C(requiredInvoicesB2C);
    res.status(200).json(requiredInvoicesHSN);
  } catch (error) {
    console.error('Error in gstR1:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

