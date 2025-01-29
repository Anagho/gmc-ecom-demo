import Order from "../../models/orderModel/orderModel.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ data: orders, status: "Successful" });
  } catch (error) {
    res.status(400).json({ data: error, status: "Failed" });
  }
};

export { getAllOrders };
