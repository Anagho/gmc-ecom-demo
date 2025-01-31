import { ProductModel } from "../../models/productModel/productModel.js";

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (product) {
      res.json({ message: "product deleted" });
      console.log("Product deleted");
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { deleteProduct };
