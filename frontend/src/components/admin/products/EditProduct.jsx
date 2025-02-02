import { useState } from "react";
import { Modal, Input, Select, Button, InputNumber, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../../utils/helper";
import { updateProduct } from "../../../features/product/productSlice";

const { TextArea } = Input;

const EditProduct = ({
  productId,
  productName,
  productImage,
  productDescription,
  productCategory,
  productPrice,
  stockStatus,
  productQuantity,
  refreshProducts
}) => {
  const dispatch = useDispatch();

  // Form State
  const [formData, setFormData] = useState({
    product_name: productName,
    product_price: productPrice,
    product_category: productCategory,
    product_description: productDescription,
    product_quantity: productQuantity,
    product_image: productImage,
    product_in_stock: stockStatus,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle Input Change
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      // Convert `product_in_stock` to Boolean
      const updatedData = {
        ...formData,
        product_in_stock:
          formData.product_in_stock === "In Stock" ? true : false,
      };

      const response = await axios.put(
        `${serverUrl}/product/${productId}`,
        updatedData
      );
      console.log(response);

      if (response.data.status === "success") {
        console.log(response);
        dispatch(updateProduct(response.data.product));
        messageApi.success(response.data.message);
      }

      // Close modal on success
      setIsModalOpen(false);

      // Reload the products from the database
      refreshProducts()
      
    } catch (error) {
       if (error.response && error.response.data.message) {
         messageApi.error(error.response.data.message);
       } else {
         messageApi.error("Failed to update product. Try again.");
       }
    } finally {
       setLoading(false);
    }

  };

   if (loading) {
     return (
       <div className="flex items-center justify-center h-screen bg-gray-100">
         <h1 className="text-4xl text-gray-600 font-semibold animate-pulse">
           Editing product...
         </h1>
       </div>
     );
   }

   console.log(formData)
  return (
    <>
    {contextHolder}
      <Button
        icon={<EditOutlined className="text-blue-500" title="Edit Product" />}
        onClick={showModal}
      />

      <Modal
        title="Edit product content"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <h2 className="text-green-700 mb-2">
          Editing product with id: {productId}
        </h2>

        <p className="font-medium">Product Name:</p>
        <Input
          value={formData.product_name}
          onChange={(e) => handleChange("product_name", e.target.value)}
          className="mb-2"
          placeholder="Enter product name"
          size="large"
        />

        <p className="font-medium">Product Price:</p>
        <InputNumber
          value={formData.product_price}
          onChange={(value) => handleChange("product_price", value)}
          className="mb-2"
          style={{
            width: "100%",
          }}
          placeholder="Enter a product price"
          size="large"
        />
        <p className="font-medium">Product Quantity:</p>
        <InputNumber
          value={formData.product_quantity}
          onChange={(value) => handleChange("product_quantity", value)}
          className="mb-2"
          style={{
            width: "100%",
          }}
          placeholder="Enter product quantity"
          size="large"
        />
        <p className="font-medium">Product description:</p>
        <TextArea
          value={formData.product_description}
          onChange={(e) => handleChange("product_description", e.target.value)}
          className="mb-2"
          autoSize={{
            minRows: 4,
            maxRows: 6,
          }}
        />
        <p className="font-medium">Product category:</p>
        <Select
          showSearch
          size="large"
          className="w-full mb-2"
          value={formData.product_category}
          onChange={(value) => handleChange("product_category", value)}
          placeholder="Select a product category"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "fruits",
              label: "Fruits",
            },
            {
              value: "vegetables",
              label: "Vegetables",
            },
            {
              value: "dairy",
              label: "Dairy",
            },
            {
              value: "grains",
              label: "Grain",
            },
          ]}
        />
        <img
          className="w-20"
          src={formData.product_image}
          alt={formData.product_name}
        />
        <p className="font-medium">Product image url:</p>
        <Input
          value={formData.product_image}
          onChange={(e) => handleChange("product_image", e.target.value)}
          size="large"
          className="mb-2"
        />

        <p className="font-medium">Product available?:</p>
        <Select
          showSearch
          className="w-full"
          value={formData.product_in_stock}
          onChange={(value) => handleChange("product_in_stock", value)}
          placeholder="Is the product available?"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: true,
              label: "In Stock",
            },
            {
              value: false,
              label: "Out of Stock",
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default EditProduct;
