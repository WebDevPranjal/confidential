const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { 
        type: String,
        required: true
    },
  email: {
         type: String,  
         unique: true 
    },
  address: {
        type: String,
        required: true
  },
  phoneNumber: {
        type : Number,
        unique: true
  },
  dlNumber: {
        type : String,
        required: true,
        unique : true
  },
  gstnNumber: {
        type : String,
        required : true,
        unique : true,
  },
  category: {
        type : String,
        enum: ['creditor', 'debitor'],
        required : true,
  },
  
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
