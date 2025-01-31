import { useState } from "react";
import { Modal, Input, Select, Button, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";

const { TextArea } = Input;

const EditProduct = ({productId, productName, productImage, productDescription, productCategory, productPrice, stockStatus, productQuantity}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        icon={<EditOutlined className="text-blue-500" title="Edit Product" />}
        onClick={showModal}
      />

      <Modal
        title="Edit product content"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2 className="text-green-700 mb-2">Editing product with id: {productId}</h2>

        <p className="font-medium">Product Name:</p>
        <Input value={productName} className="mb-2" placeholder="Enter product name" size="large" />

        <p className="font-medium">Product Price:</p>
        <InputNumber
        value={productPrice}
          className="mb-2"
          style={{
            width: "100%",
          }}
          placeholder="Enter a product price"
          size="large"
        />
        <p className="font-medium">Product Quantity:</p>
        <InputNumber
        value={productQuantity}
          className="mb-2"
          style={{
            width: "100%",
          }}
          placeholder="Enter product quantity"
          size="large"
        />
        <p className="font-medium">Product description:</p>
        <TextArea
        value={productDescription}
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
          value={productCategory}
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
        <img className="w-20" src={productImage} alt={productName} />
        <p className="font-medium">Product image url:</p>
        <Input
        value={productImage}
          placeholder="Enter a product image url"
          size="large"
          className="mb-2"
        />

        <p className="font-medium">Product available?:</p>
        <Select
          showSearch
          className="w-full"
          value={stockStatus}
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
