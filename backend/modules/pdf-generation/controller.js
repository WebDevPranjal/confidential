const Customer = require('../customer/schema');

const getPdfData = async (invoice) => {
    const customer = await Customer.findOne( { name: invoice.customerName })
    //console.log(customer);
    
}

module.exports = { getPdfData }