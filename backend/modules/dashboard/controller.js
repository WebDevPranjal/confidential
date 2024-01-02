const Product = require('../product/schema');
const Invoice = require('../invoices/schema');

exports.dashboard = async (req, res) => {
    try {
        const products = await Product.find();
        const invoices = await Invoice.find();
        const lastInvoice = invoices[invoices.length - 1];
        const productsForStock = [];
        const productsForExipre = [];

        products.forEach((product) => {
            const { name, batches } = product;
            let qty = 0;

            if (batches.length !== 0) {
                batches.forEach((batch) => {
                    if (batch !== null) {
                        qty += batch.quantity;
                    }
                });
            }

            const data = {
                name: name,
                quantity: qty,
            };

            productsForStock.push(data);
        });

        products.forEach((product) => {
            const { name, batches } = product;
        
            if (batches.length > 0) {
                batches.forEach((batch) => {
                    if (batch != null && isNearExipre(batch.expireDate) == true) {
                        const batchName = batch.batch;
                        const qty = batch.quantity;
                        const expire = batch.expireDate;

                        const data = {
                            name: name,
                            batch: {
                                name: batchName,
                                quantity: qty,
                                expire: expire,
                            },
                        };
        
                        productsForExipre.push(data)
                    }
                });
            }
        });

        function isNearExipre(date) {
            const todayDate = new Date().getTime();
            const nearExipreDate = todayDate +( 3 * 30 * 24 * 60 * 60 * 1000)
            if(date.getTime() < nearExipreDate) {
                return true;
            }else {
                return false;
            }
        }
        
        const header = 'Dashboard'
        res.render('dashboard', 
            {  products, productsForStock , 
               productsForExipre , lastInvoice , 
               invoices, header,
            }
        );
    } catch (error) {
        console.log(error);
        res.send('Internal error');
    }
};
