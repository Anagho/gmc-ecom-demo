import { ProductModel } from "../../models/productModel/productModel.js";

async function getAllProducts(req, res) {
  const {category} = req.query

  const queryObject = {}
  
  if (category && category !== "all") {
    queryObject.product_category = category
  }


  try {
    const products = await ProductModel.find(queryObject);
    res.status(200).json({
      products,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { getAllProducts };
