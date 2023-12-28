const Customer = require('../../modules/customer/schema');
const invoiceRenderUtil = require('../invoiceRender');

const getRequiredInvoices = async (invoices) => {
    const reqMonth = 11;
    const reqYear = 2023;
    const processedInvoices = [];

    const gst = [{type: 5 , amount : 0},{type: 12 , amount : 0},{type: 18 , amount : 0}]
  
    for (const invoice of invoices) {
      if (
        invoice.date.getMonth() === reqMonth &&
        invoice.date.getFullYear() === reqYear //&&
       // invoice.type === 'sales'
      ) {

        const customer = await Customer.findOne({ name: invoice.customerName });
        if(customer.gstnNumber != '') {
            const products = await invoiceRenderUtil.processInvoiceProducts(invoice.products);

            products.forEach((product)=>{
                if(product.gst === 5) {
                    gst[0].amount += product.quantity * product.rate -  (product.quantity * product.rate) * (product.discount/100)
                }else if(product.gst === 12) {
                    gst[1].amount += product.quantity * product.rate -  (product.quantity * product.rate) * (product.discount/100)
                }else if(product.gst === 18) {
                    gst[2].amount += product.quantity * product.rate -  (product.quantity * product.rate) * (product.discount/100)
                }
                
            })
           // processedInvoices.push(data);
        }
      }
    }
  
    return gst;
};

module.exports = {
    getRequiredInvoices
}