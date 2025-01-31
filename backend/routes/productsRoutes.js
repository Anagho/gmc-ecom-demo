import express from "express";
import { addProduct } from "../controllers/productController/createProducts.js";
import { getAllProducts } from "../controllers/productController/getProducts.js";
import { updateProduct } from "../controllers/productController/updateProducts.js";
import { deleteProduct } from "../controllers/productController/deleteProducts.js";

const router = express.Router();

router.post("/create-product", addProduct);
router.get("/all-products", getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct)


export default router;