import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency, serverUrl } from "../../../utils/helper";
import { Button } from "antd";
import { Link } from "react-router";
import { DeleteOutlined } from "@ant-design/icons";
import EditProduct from "./EditProduct";


const AllStoreProducts = () => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getStoreProducts() {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/product/all-products`);
      setStoreProducts(response.data.products);
      //   console.log(response.data.products)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStoreProducts();
  }, []);

  //   console.log(storeProducts)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl text-gray-600 font-semibold animate-pulse">
          Loading store products...
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-[1100px] mx-auto py-16 px-4">
      <div className="flex justify-end">
        <Link to={"/admin/add-product"}>
          <Button type="primary" size="large">Create a Product</Button>
        </Link>
      </div>
      <h2 className="text-2xl my-4 leading-6 text-gray-700 text-center font-bold">
        All Products
      </h2>
      <div>
        {/* Dashboard data */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-800 text-left">
              <tr>
                <th className="py-2 px-4 border">S/N</th>
                <th className="py-2 px-4 border">Product</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Stock Status</th>
                <th className="py-2 px-4 border">Quantity Available</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {storeProducts.map((item, index) => {
                return (
                  <tr
                    className="text-gray-500 hover:bg-gray-50 hover:text-black cursor-pointer"
                    key={item._id}
                  >
                    <td className="py-2 px-4 border">{index + 1}</td>
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
                    <td className="py-2 px-4 border">
                      {item.product_description}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.product_category}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.product_in_stock ? "In Stock" : "Out of Stock"}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.product_quantity}
                    </td>
                    <td className="py-2 px-4 border">
                      <span className="flex gap-3">
                        <EditProduct
                          productId={item._id}
                          productName={item.product_name}
                          productDescription={item.product_description}
                          productPrice={item.product_price}
                          productQuantity={item.product_quantity}
                          stockStatus={item.product_in_stock ? "In Stock" : "Out of Stock"}
                          productImage={item.product_image}
                          productCategory={item.product_category}
                        />
                        <Button
                          icon={
                            <DeleteOutlined
                              className="text-red-500"
                              title="Delete Product"
                            />
                          }
                        />
                      </span>
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

export default AllStoreProducts;
