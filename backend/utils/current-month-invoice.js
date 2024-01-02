function getMonthWiseInvoices(allInvoices) {
    const currentMonth = new Date().getMonth() + 1; 

    const targetMonthInvoices = allInvoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date);
        const invoiceMonth = invoiceDate.getMonth() + 1;

        return invoiceMonth === currentMonth;
    });

    return targetMonthInvoices;
}

module.exports = {
    getMonthWiseInvoices
}