const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./modules/customer/routes');
const productRoutes = require('./modules/product/routes');
const invoiceRoutes = require('./modules/invoices/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Connect to your MongoDB Atlas database
mongoose.connect('mongodb+srv://vpranjal291003:test1234@cluster0.ye45ys4.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON requests
app.use(express.json());

// Use the customer routes
app.use('/customer', customerRoutes);
app.use('/product', productRoutes);
app.use('/invoices', invoiceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
