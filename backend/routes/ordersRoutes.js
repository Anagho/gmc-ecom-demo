import express from "express";
import { createCustomerOrder } from "../controllers/orderController/createCustomerOrder.js";
import { getAllOrders } from "../controllers/orderController/getOrders.js";
import { getOrderInfo } from "../controllers/orderController/getSingleOrderInfo.js";

const router = express.Router();

router.post("/create-order", createCustomerOrder);
router.get("/all-orders", getAllOrders);
router.get("/order-info/:orderId", getOrderInfo);

export default router;
