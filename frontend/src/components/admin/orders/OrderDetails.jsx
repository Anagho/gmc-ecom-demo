import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { formatCurrency, serverUrl } from "../../../utils/helper";
import moment from "moment";
import BackButton from "../../ui/buttons/BackButton";

const OrderDetails = () => {
  const params = useParams();
  const [orderInformation, setOrderInformation] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getOrderDetails() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serverUrl}/order/order-info/${params.order_id}`
      );
      setOrderInformation(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl text-gray-600 font-semibold animate-pulse">
          Loading order details...
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <BackButton />
      <p className="text-lg font-semibold text-gray-700 mb-4">
        Order Date:{" "}
        <span className="font-normal text-gray-600">
          {moment(new Date(orderInformation.createdAt)).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </span>
      </p>
      <h3 className="text-base mb-6">
        <span
          className={`p-2 rounded-md font-bold ${
            orderInformation.orderStatus === "Completed"
              ? "bg-green-500 text-white"
              : "bg-orange-500 text-white"
          }`}
        >
          {orderInformation.orderStatus}
        </span>
      </h3>

      {/* Transaction Details */}
      <div className="mb-6 bg-green-200 rounded-md p-2">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Transaction Details
        </h2>
        <p>
          <strong>Paystack Transaction ID:</strong>{" "}
          {orderInformation.reference.trxref}
        </p>
        <p>
          <strong>Transaction Status:</strong>{" "}
          {orderInformation.reference.status}
        </p>
        <p>
          <strong>Payment:</strong> {orderInformation.reference.message}
        </p>
      </div>

      {/* Customer Information */}
      <div className="mb-6 bg-blue-100 rounded-md p-2">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Customer Information
        </h2>
        <p>
          <strong>Name:</strong>{" "}
          {orderInformation.customerDeliveryInfo.customerName}
        </p>
        <p>
          <strong>Email:</strong> {orderInformation.customerDeliveryInfo.email}
        </p>
        <p>
          <strong>Phone Number:</strong>{" "}
          {orderInformation.customerDeliveryInfo.phoneNumber}
        </p>
        <p>
          <strong>Delivery Address:</strong>{" "}
          {orderInformation.customerDeliveryInfo.deliveryAddress}
        </p>
      </div>

      {/* Cart Items Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-800 text-left">
            <tr>
              <th className="py-2 px-4 border">Product ID</th>
              <th className="py-2 px-4 border">Product Image</th>
              <th className="py-2 px-4 border">Product Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderInformation.cartItems.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } text-gray-800`}
              >
                <td className="py-2 px-4 border">{item.product_id}</td>
                <td className="py-2 px-4 border">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border">{item.product_name}</td>
                <td className="py-2 px-4 border">
                  {formatCurrency(item.product_price)}
                </td>
                <td className="py-2 px-4 border">{item.product_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
