import { ProductModel } from "../../models/productModel/productModel.js";

async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      products,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { getAllProducts };
