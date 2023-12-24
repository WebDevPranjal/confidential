const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  // Batch information
  batch: {
    type: String,
    required: true
  },

  // Unique quantity for the batch
  quantity: {
    type: Number,
    required: true
  },

  // Expiration date for the batch
  expireDate: {
    type: Date,
    required: true
  },
  // Packaging information
  packaging: {
    type: String,
    required: true
  },
  //mrp
  mrp: {
    type: Number,
    required: true
  },
});

const productSchema = new mongoose.Schema({
  // Product name
  name: {
    type: String,
    required: true
  },

  // GST (Goods and Services Tax)
  gst: {
    type: Number,
    required: true
  },

  // HSN (Harmonized System of Nomenclature) code
  hsn: {
    type: Number,
    required: true
  },

  purchaserate: {
    type: Number
  },

  salerate: {
    type: Number
  },

  companyname: {
    type: String,
    required: true
  },
  // Array of batches with unique quantity and expiration date
  batches: [batchSchema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
