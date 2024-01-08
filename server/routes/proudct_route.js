import express from 'express';
import { addProduct, getProductById, getProducts, purchaseProduct } from '../controllers/product_controller.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/add', addProduct);

router.get('/:id', getProductById);

router.post('/purchase', purchaseProduct);

export { router as productRoutes };