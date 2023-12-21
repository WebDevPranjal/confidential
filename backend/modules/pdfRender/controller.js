// controllers/invoiceController.js
const PDFDocument = require('pdfkit');

function generateInvoice(req, res) {
  const { customerName, amount, items } = req.body;

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
  doc.pipe(res);

  doc.fontSize(14).text('Invoice', { align: 'center' });
  doc.moveDown();
  doc.text(`Customer: ${customerName}`);
  doc.text(`Amount: $${amount}`);
  doc.moveDown();

  // Draw the table manually
  const table = {
    headers: ['Item', 'Quantity', 'Price'],
    rows: items.map(item => [item.name, item.quantity, `$${item.price.toFixed(2)}`]),
  };

  const tableTop = doc.y;
  const tableLeft = 50;
  const columnWidth = 150;
  const headerHeight = 20;
  const rowHeight = 20;

  // Draw header
  doc.font('Helvetica-Bold').fontSize(12);
  table.headers.forEach((header, i) => {
    doc.text(header, tableLeft + i * columnWidth, tableTop);
  });

  // Draw rows
  doc.font('Helvetica').fontSize(10);
  table.rows.forEach((row, i) => {
    row.forEach((cell, j) => {
      doc.text(cell, tableLeft + j * columnWidth, tableTop + headerHeight + i * rowHeight);
    });
  });

  // Finalize the PDF
  doc.end();
}

module.exports = {
  generateInvoice,
};
