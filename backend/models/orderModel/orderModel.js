import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({
    reference: {
        transaction: String,
        message: String,
        status: String,
        trxref: String,
    },
    customerDeliveryInfo: {
        customerName: String,
        email: String,
        phoneNumber: String,
        deliveryAddress: String,
    },
    userCartSummary: {
        totalAmount: Number,
        totalCartItems: Number,
    },
    cartItems: [
        {
            product_name: String,
            product_price: Number,
            product_id: String,
            product_description: String,
            product_image: String,
            product_quantity: Number,
        }
    ],
    orderStatus: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
    }
}, {timestamps: true});

const Order = new mongoose.model("orders", orderSchema);
export default Order;