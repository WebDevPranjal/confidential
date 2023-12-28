const Customer = require('./schema');

exports.getAllCustomers = async (req, res) => {
    try {
      const customers = await Customer.find();
      res.render('./customer/customer-list', { customers });
     // res.json(customers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.render('./customer/update-customer', { customer } )
    //res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createCustomerPage = async (req,res) => {
    try{
      res.render('./customer/create');
    }catch (error){
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error'});
    }
}
  
exports.createCustomer = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCustomer = await Customer.findOne({ name });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    const newCustomer = new Customer(req.body);
    await newCustomer.save();

    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
  
exports.updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    // Check if the customer exists
    const existingCustomer = await Customer.findById(customerId);

    if (!existingCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const { name, email, address, gstnNumber, dlNumber, phoneNumber } = req.body;

    existingCustomer.name = name || existingCustomer.name;
    existingCustomer.email = email || existingCustomer.email;
    existingCustomer.address = address || existingCustomer.address;
    existingCustomer.gstnNumber = gstnNumber || existingCustomer.gstnNumber;
    existingCustomer.dlNumber = dlNumber || existingCustomer.dlNumber;
    existingCustomer.phoneNumber = phoneNumber || existingCustomer.phoneNumber;

    const updatedCustomer = await existingCustomer.save();
    res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    // Check if the customer exists
    const existingCustomer = await Customer.findById(customerId);

    if (!existingCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Delete the customer by ID using deleteOne
    await Customer.deleteOne({ _id: customerId });

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
