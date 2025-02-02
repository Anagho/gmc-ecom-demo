import { ProductModel } from "../../models/productModel/productModel.js";

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find and update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        product_name: req.body.product_name?.trim(),
        product_price: req.body.product_price,
        product_category: req.body.product_category?.trim(),
        product_description: req.body.product_description?.trim(),
        product_quantity: req.body.product_quantity,
        product_image: req.body.product_image?.trim(),
        product_in_stock: req.body.product_in_stock,
      },
      { new: true, runValidators: true } // Returns the updated product & applies schema validation
    );

    // If product not found
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the updated product
    res.status(200).json({message: "Product updated successfully", updatedProduct});
    console.log(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { updateProduct };
