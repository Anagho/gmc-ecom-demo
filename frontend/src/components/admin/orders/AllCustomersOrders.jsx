import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency, serverUrl } from "../../../utils/helper.js";
import moment from "moment";
import { Link } from "react-router";

const AllCustomersOrders = () => {
  const [customersOrders, setCustomersOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCustomersOrders() {
    try {
      const response = await axios.get(`${serverUrl}/order/all-orders`);
      setCustomersOrders(response.data.data);
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomersOrders();
  }, []);

  console.log(customersOrders);

  return (
    <section className="max-w-[1100px] mx-auto py-16 px-4">
      <h2 className="text-2xl my-4 leading-6 text-gray-700 text-center">
        All Orders
      </h2>
      <div>
        {/* Admin Sidebar */}
        <div></div>

        {/* Dashboard data */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-800 text-left">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Order status</th>
                <th className="py-2 px-4 border">Total Amount</th>
                <th className="py-2 px-4 border">Total Items</th>
                <th className="py-2 px-4 border">Details</th>
              </tr>
            </thead>

            <tbody>
              {customersOrders.map((item) => {
                return (
                  <tr
                    className="text-gray-500 hover:bg-gray-50 hover:text-black cursor-pointer"
                    key={item._id}
                  >
                    <td className="py-2 px-4 border">
                      {moment(new Date(item.createdAt)).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.customerDeliveryInfo.customerName}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.customerDeliveryInfo.email}
                    </td>
                    <td className="py-2 px-4 border">{item.orderStatus}</td>
                    <td className="py-2 px-4 border">
                      {formatCurrency(item.userCartSummary.totalAmount)}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.userCartSummary.totalCartItems}
                    </td>
                    <td className="py-2 px-4 border">
                      <Link to={`/admin/${item._id}`}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllCustomersOrders;
