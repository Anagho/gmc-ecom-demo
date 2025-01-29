import express from "express";
import { addProduct } from "../controllers/productController/createProducts.js";

const router = express.Router();

router.post("/create-product", addProduct);


export default router;