const invoiceRenderUtil = require('../invoiceRender');

const getRequiredInvoices = async (invoices) => {
    const reqMonth = 11;
    const reqYear = 2023;

    const hsnAmounts = new Map(); // Use a Map to store HSN code and total amount
  
    for (const invoice of invoices) {
        if (
            invoice.date.getMonth() === reqMonth &&
            invoice.date.getFullYear() === reqYear //&&
            // invoice.type === 'sales'
        ) {
            const products = await invoiceRenderUtil.processInvoiceProducts(invoice.products);  
            
            products.forEach(product => {
                if (product.hsn) {
                    const hsnCode = product.hsn;
                    const amount = product.quantity * product.rate;

                    // Check if the HSN code is already in the Map
                    if (hsnAmounts.has(hsnCode)) {
                        // If yes, add the amount to the existing total
                        hsnAmounts.set(hsnCode, hsnAmounts.get(hsnCode) + amount);
                    } else {
                        // If no, create a new entry in the Map
                        hsnAmounts.set(hsnCode, amount);
                    }
                }
            });  
        }
    }

    return Array.from(hsnAmounts.entries());
};

module.exports = {
    getRequiredInvoices
}