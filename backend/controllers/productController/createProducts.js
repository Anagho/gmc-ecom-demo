import { ProductModel } from "../../models/productModel/productModel.js";
import { nanoid } from "nanoid";
import validator from "validator";

async function addProduct(req, res) {
  const {
    product_name,
    product_price,
    product_description,
    product_category,
    product_image,
  } = req.body;

  if (validator.isEmpty(product_name, { ignore_whitespace: true })) {
    return res
      .status(400)
      .json({ message: "Please provide a product name", status: "failed" });
  }

  if (validator.isEmpty(product_description, { ignore_whitespace: true })) {
    return res
      .status(400)
      .json({
        message: "Please provide a product description",
        status: "failed",
      });
  }

  if (product_price < 1) {
    return res.status(400).json({
      message: "Please provide a product price",
      status: "failed",
    });
  }

  if (
    validator.isEmpty(product_category, {
      ignore_whitespace: true,
    })
  ) {
    return res
      .status(400)
      .json({ message: "Please provide a product category", status: "failed" });
  }

  if (!validator.isURL(product_image)) {
    return res
      .status(400)
      .json({ message: "Please provide a product image", status: "failed" });
  }

  // Add new product here
  try {
    // Check if product already exists (case insensitive)
    const existingProduct = await ProductModel.findOne({
      product_name: { $regex: new RegExp("^" + product_name + "$", "i") },
    });

    if (existingProduct) {
      return res
        .status(400)
        .json({
          status: "error",
          message: `The product: ${product_name}, already exists in the store`,
        });
    }

    const product = new ProductModel({
      product_id: nanoid(10),
      product_name: product_name,
      product_price: product_price,
      product_description: product_description,
      product_category: product_category,
      product_image: product_image,
    });
    await product.save();

    res
      .status(201)
      .json({ message: "Product created successfully", status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "failed" });
  }
}

export { addProduct };
