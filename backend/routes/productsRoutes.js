import express from "express";
import { addProduct } from "../controllers/productController/createProducts.js";
import { getAllProducts } from "../controllers/productController/getProducts.js";

const router = express.Router();

router.post("/create-product", addProduct);
router.get("/all-products", getAllProducts);


export default router;