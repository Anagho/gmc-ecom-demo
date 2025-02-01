import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency, serverUrl } from "../../../utils/helper.js";
import moment from "moment";
import { Link } from "react-router";

const AllCustomersOrders = () => {
  const [customersOrders, setCustomersOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCustomersOrders() {
    setLoading(true)
    try {
      const response = await axios.get(`${serverUrl}/order/all-orders`);
      setCustomersOrders(response.data.data);
      //   console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCustomersOrders();
  }, []);

  // console.log(customersOrders);

   if (loading) {
     return (
       <div className="flex items-center justify-center h-screen bg-gray-100">
         <h1 className="text-4xl text-gray-600 font-semibold animate-pulse">
           Loading Customer Orders...
         </h1>
       </div>
     );
   }


  return (
    <section className="overflow-y-auto">
      <h2 className="text-2xl my-4 leading-6 text-gray-700 text-center font-bold">
        All Orders
      </h2>
      <div>
        {/* Dashboard data */}
        <div className="bg-white overflow-auto">
          <table className="table-auto w-full border border-gray-900 rounded-lg">
            <thead className="bg-gray-300 text-gray-800 text-left">
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
                    className="text-gray-800 hover:bg-gray-50 hover:text-black"
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
                      <Link
                        to={`/admin/${item._id}`}
                        className="bg-sky-600 text-white p-2 rounded-md cursor-pointer"
                      >
                        View
                      </Link>
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
