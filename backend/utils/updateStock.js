const Product = require('../modules/product/schema');

const updateStockSales = async (productName, productBatch, productQty, freeQty) => {
    try {
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
      product.batches[batchIndex].quantity = product.batches[batchIndex].quantity -freeQty - productQty;
  
      // Save the updated product
      const updatedProduct = await product.save();
  
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };

  const updateStockPurchase = async (productName, productBatch, productQty, freeQty) => {
    try {
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
      product.batches[batchIndex].quantity = product.batches[batchIndex].quantity + freeQty + productQty;
  
      // Save the updated product
      const updatedProduct = await product.save();
  
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };

  const updateStockPurchaseOnDelete = async (productName, productBatch, productQty, freeQty) => {
    try {
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
      product.batches[batchIndex].quantity = product.batches[batchIndex].quantity - freeQty - productQty;
  
      // Save the updated product
      const updatedProduct = await product.save();
  
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };

  const updateStockSalesOnDelete = async (productName, productBatch, productQty, freeQty) => {
    try {
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
      product.batches[batchIndex].quantity = product.batches[batchIndex].quantity + freeQty + productQty;
  
      // Save the updated product
      const updatedProduct = await product.save();
  
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the calling function
    }
  };
  
  module.exports = { updateStockSales, updateStockPurchase, updateStockPurchaseOnDelete, updateStockSalesOnDelete }