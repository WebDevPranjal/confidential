const Invoice = require('../../../modules/invoices/schema');
const currentMonthUtil = require('../../../utils/current-month-invoice');
const invoiceUtils = require('../../../utils/invoiceRender');
const Customer = require('../../../modules/customer/schema');

exports.currentMonthInvoice = async (req, res) => {
    try {
        const allInvoices = await Invoice.find();
        const invoices = currentMonthUtil.getMonthWiseInvoices(allInvoices);
        const header = 'Reports';
        const invoiceDataSales = [];
        const invoiceDataPurchase = [];

        for (let invoice of invoices) {
            if(invoice.type === 'sales') {
                const products = await invoiceUtils.processInvoiceProducts(invoice.products);
                const gstDetails = invoiceUtils.calculateGSTDetails(products);
                const total = invoiceUtils.calculateTotal(products, gstDetails);
    
                const data = {
                    number: invoice.invoiceNumber,
                    total: total.grandTotal,
                };
    
                invoiceDataSales.push(data);
            }

        }

        for (let invoice of invoices) {
            if(invoice.type === 'purchase') {
                const products = await invoiceUtils.processInvoiceProducts(invoice.products);
                const gstDetails = invoiceUtils.calculateGSTDetails(products);
                const total = invoiceUtils.calculateTotal(products, gstDetails);
    
                const data = {
                    number: invoice.invoiceNumber,
                    total: total.grandTotal,
                };
    
                invoiceDataPurchase.push(data);
            }

        }
       res.render('./reports/stats' , { invoiceDataSales, invoiceDataPurchase, header });
       //res.status(200).json({ invoiceData , header })
    } catch (error) {
        console.error('Error in currentMonthInvoice:', error);
        res.status(500);
    }
};

exports.productWiseSales = async (req, res) => {
    try {
        const month = Number(req.body.month);
        const year = Number(req.body.year);
        const productSold = [];
        const allInvoices = await Invoice.find();

        for (let invoice of allInvoices) {
            if (invoice.date.getMonth() + 1 === month 
                && invoice.date.getFullYear() === year) {

                const products = await invoiceUtils.processInvoiceProducts(invoice.products);
                productSold.push(...products);
            }
        }

        // removing duplicate qunatity
        const sumQuantities = (productSold) => {
            const productMap = new Map();
          
            productSold.forEach((product) => {
              const { name, quantity, free } = product;
          
              if (productMap.has(name)) {
                productMap.set(name, productMap.get(name) + quantity + free);
              } else {
                productMap.set(name, quantity + free);
              }
            });
        
            const result = Array.from(productMap, ([name, quantity]) => ({ name, quantity }));
    
            return result;
        };

        const summedProductSold = sumQuantities(productSold);

        const header = `Reports / Product-Wise / ${month} / ${year}`;
        res.render('./reports/product', { products : summedProductSold , header } );
    } catch (error) {
        console.error("Error in productWiseSales:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.prodcutWiseSalesPage = async(req,res) => {
    try{
        const header = 'Reports / Product-Wise'
        res.render('./reports/product', { products : [] , header });
    }catch(error){
        console.log(error);
        res.send(500)
    }
}

exports.customerWiseSales = async (req, res) => {
    try {
        const customers = await Customer.find();
        const { name } = req.body;
        const allInvoices = await Invoice.find({ customerName: name });
        let amount = 0;

        for (let invoice of allInvoices) {
            const products = await invoiceUtils.processInvoiceProducts(invoice.products);
            const gstDetails = invoiceUtils.calculateGSTDetails(products);
            const total = invoiceUtils.calculateTotal(products, gstDetails);

            amount += total.grandTotal;
        }

        const data = {
            name : name,
            amount : amount
        }
        const header = `Reports / Party Wise / ${name}`
        res.render('./reports/customer', { data , customers , header});
       // res.json({ data });
    } catch (error) {
        console.error('An internal error occurred', error);
        res.status(500).json({ error: 'An internal error occurred' });
    }
};

exports.customerWiseSalesPage = async(req,res) => {
    try{
        const customers = await Customer.find();
        const header = 'Reports / Party Wise';
        res.render('./reports/customer', { data : {} , customers , header });
    }catch(error){
        console.log(error);
        res.send(500)
    }
}


  