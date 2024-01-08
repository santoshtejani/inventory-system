import Product from "../models/product_model.js";
import asyncHandler from "express-async-handler";

const addProduct = asyncHandler(async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        quantity,
      } = req.body;
  
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        quantity,
      });
  
      await newProduct.save();
  
      return res.status(201).json({
        message: `Product created successfully`,
        product: newProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });


  const getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findById(productId);
  
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const getProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({}).exec();
      return res.status(200).json({
        products,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const purchaseProduct = asyncHandler(async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (product.quantity <= 0) {
        return res.status(400).json({ message: "Product out of stock" });
      }
  
      product.quantity -= quantity;
      await product.save();
  
      return res.status(200).json({
        message: `Product purchased successfully`,
        product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  
  export { addProduct, getProductById, getProducts, purchaseProduct };