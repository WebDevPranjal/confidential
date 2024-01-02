const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRoutes = require('./modules/customer/routes');
const productRoutes = require('./modules/product/routes');
const invoiceRoutes = require('./modules/invoices/routes');
const reportGstRoutes = require('./modules/reports/gst/routes');
const reportSatsRoutes = require('./modules/reports/stats/routes');
const dashboardRoutes = require('./modules/dashboard/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to your MongoDB Atlas database
mongoose.connect('mongodb+srv://vpranjal291003:test1234@cluster0.ye45ys4.mongodb.net/?retryWrites=true&w=majority', {

});

// render static pages
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/product', productRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/gst', reportGstRoutes);
app.use('/stats', reportSatsRoutes);
app.use('/', dashboardRoutes);

app.use((req, res, next) => {
  res.status(404).render('404'); 
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
