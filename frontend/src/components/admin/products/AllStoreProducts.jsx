import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency, serverUrl } from "../../../utils/helper";
import { Button, Modal, message } from "antd";
import { Link } from "react-router";
import { DeleteOutlined } from "@ant-design/icons";
import EditProduct from "./EditProduct";

const AllStoreProducts = () => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  //    Delete product function
  const handleDelete = async () => {
    console.log(selectedProductId);
    try {
      const response = await axios.delete(
        `${serverUrl}/product/${selectedProductId}`
      );

      messageApi.success(response.data.message)
      console.log(response.data.message);
      
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
      messageApi.error(error.data.message)
    }
    getStoreProducts();
  };

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
    <section className="overflow-y-auto">
      {contextHolder}
      <div className="flex justify-between items-center my-6 text-lg sm:text-xl lg:text-2xl">
        <h2 className="text-gray-700 font-medium sm:mx-auto">All Products</h2>
        <Link to={"/admin/add-product"}>
          <Button type="primary" size="large">
            Create a Product
          </Button>
        </Link>
      </div>

      <div className="overflow-auto bg-white">
        <table className="table-auto w-full text-sm sm:text-base">
          <thead className="bg-gray-300 text-gray-800 text-center">
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
                  className="text-sm sm:text-base text-gray-800 hover:bg-gray-50 hover:text-black cursor-pointer"
                  key={item._id}
                >
                  <td className="py-2 px-4 border text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border font-semibold">
                    {item.product_name}
                  </td>
                  <td className="py-2 px-4 border font-semibold">
                    {formatCurrency(item.product_price)}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.product_description.slice(0, 25) + "..."}
                  </td>
                  <td className="py-2 px-4 border">{item.product_category}</td>
                  <td className="py-2 px-4 border">
                    {item.product_in_stock ? "In Stock" : "Out of Stock"}
                  </td>
                  <td className="py-2 px-4 border text-center">
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
                        stockStatus={
                          item.product_in_stock ? "In Stock" : "Out of Stock"
                        }
                        productImage={item.product_image}
                        productCategory={item.product_category}
                        refreshProducts={getStoreProducts}
                      />
                      <Button
                        icon={<DeleteOutlined className="text-red-500" />}
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setSelectedProductId(item._id);
                        }}
                        title="Delete Product"
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        title="Delete Product"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p className="text-red-500 text-xl">
          Are you sure you want to delete this product?
        </p>
      </Modal>
    </section>
  );
};

export default AllStoreProducts;
