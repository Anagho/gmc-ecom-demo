import { ProductModel } from "../../models/productModel/productModel.js";

// update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_category: req.body.product_category,
        product_description: req.body.product_description,
        product_quantity: req.body.product_quantity,
        product_image: req.body.product_image,
        product_in_stock: req.body.product_in_stock,
      },
      { new: true }
    );
    if (product) {
      res.json(product);
      console.log(product);
    } 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { updateProduct }