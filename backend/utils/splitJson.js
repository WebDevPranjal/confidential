const originalInvoice = {
    gstNumber: 'AAA232323e',
    customerName: 'Aarya',
    invoiceNumber: 20,
    invoiceDate: '20/10/2003',
    invoiceValue: 32034,
    placeOfSupply: '23-Madhya Pradesh',
    reverseCharge: 'N',
    taxRate: '',
    invoiceType: 'Regular B2B',
    ecomGstn: '',
    rate: {
      12: 1000,
      18: 2000,
      5 : 100,
    },
    taxableValue: 2332,
    cessAmount: 0,
};
  
// Function to split the original invoice based on rates and adjust taxableValue
function splitInvoiceByRate(originalInvoice) {
    const { rate, taxableValue, ...rest } = originalInvoice;
  
    const invoices = [];
  
    // Iterate over rates and create separate invoices
    for (const rateValue in rate) {
        const newInvoice = {
            ...rest,
            rate: parseFloat(rateValue),
            taxableValue: rate[rateValue],
        };
        invoices.push(newInvoice);
    }
  
    return invoices;
}
  
const splitInvoices = splitInvoiceByRate(originalInvoice);
  
console.log('Split Invoices:', splitInvoices);
