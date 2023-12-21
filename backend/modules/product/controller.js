const Product = require('./schema');

exports.createProduct = async (req, res) => {
    try {
        const { name, gst, hsn, batches } = req.body;
    
        // Check if batches is an array, if not, convert it to an array
        const batchArray = Array.isArray(batches) ? batches : [batches];
    
        // Check if a product with the same name already exists
        let existingProduct = await Product.findOne({ name });
    
        if (existingProduct) {
          // If the product exists, add the new batches to it
          existingProduct.batches.push(...batchArray);
          await existingProduct.save();
    
          res.status(200).json(existingProduct);
        } else {
          // If the product does not exist, create a new product
          const newProduct = new Product({ name, gst, hsn, batches: batchArray });
          const savedProduct = await newProduct.save();
    
          res.status(201).json(savedProduct);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a product by ID
exports.updateProductById = async (req, res) => {
  const productId = req.params.id; // or get the id from frontend
  const productBatch = req.body.batches.batch;
  
  try {
    // Find the product by ID
    const product = await Product.findById(productId);
  
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
  
    // Find the index of the batch within the batches array
    const batchIndex = product.batches.findIndex(batch => batch.batch === productBatch);
  
    if (batchIndex === -1) {
      return res.status(404).json({ error: 'Batch not found' });
    }
  
    // Update the batch with the new data
    product.batches[batchIndex].batch = req.body.batches.batch || product.batches[batchIndex].batch;
    product.batches[batchIndex].quantity = req.body.batches.quantity || product.batches[batchIndex].quantity;
    product.batches[batchIndex].expireDate = req.body.batches.expireDate || product.batches[batchIndex].expireDate;
    product.batches[batchIndex].packaging = req.body.batches.packaging || product.batches[batchIndex].packaging;
  
    // Save the updated product
    const updatedProduct = await product.save();
  
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
};

// Controller function to delete a product by ID
exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
