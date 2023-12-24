const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  free: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  invoicerate: {
    type: Number,
    required: true
  }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true // purchase or sell
  },
  products: [productSchema]
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
