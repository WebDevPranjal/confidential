const Product = require('../modules/product/schema');

const updateStock = async (productName, productBatch, productQty, billingQty) => {
    try {
      // Find the product by name
      const product = await Product.findOne({ name: productName });
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      // Find the index of the batch within the batches array
      const batchIndex = product.batches.findIndex(batch => batch.batch === productBatch);
  
      if (batchIndex === -1) {
        throw new Error('Batch not found');
      }
  
      console.log(product.batches[batchIndex].quantity);
      // Update the batch with the new data
      product.batches[batchIndex].quantity = product.batches[batchIndex].quantity + billingQty - productQty;
  
      // Save the updated product
      const updatedProduct = await product.save();
  
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };
  
  module.exports = { updateStock }