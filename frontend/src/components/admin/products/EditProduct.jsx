import { useState } from "react";
import { Modal, Input, Button, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { editProduct } from "../../../features/product/productSlice"
import { useDispatch } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

function EditProduct({
  productId,
  productName,
  productDescription,
  productPrice,
  productQuantity,
  stockStatus,
  productImage,
  productCategory, 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States for product fields
  const [updateProductName, setUpdateProductName] = useState(productName);
  const [updateProductDescription, setUpdateProductDescription] =
    useState(productDescription);
  const [updateProductPrice, setUpdateProductPrice] = useState(productPrice);
  const [updateProductQuantity, setUpdateProductQuantity] =
    useState(productQuantity);
  const [updateStockStatus, setUpdateStockStatus] = useState(stockStatus);
  const [updateProductImage, setUpdateProductImage] = useState(productImage);
  const [updateProductCategory, setUpdateProductCategory] =
    useState(productCategory); 

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Ensure all required fields are filled in
    if (
      updateProductName.trim() === "" ||
      updateProductDescription.trim() === "" ||
      updateProductPrice.trim() === "" ||
      updateProductQuantity.trim() === "" ||
      updateStockStatus.trim() === "" ||
      updateProductCategory.trim() === ""
    ) {
      return;
    }

    // Dispatch the action to update the product in the store
    dispatch(
      editProduct({
        product_id: productId,
        update_product_name: updateProductName.trim(),
        update_product_description: updateProductDescription.trim(),
        update_product_price: parseFloat(updateProductPrice.trim()), // Ensure price is a number
        update_product_quantity: parseInt(updateProductQuantity.trim(), 10), // Ensure quantity is an integer
        update_stock_status: updateStockStatus,
        update_product_image: updateProductImage.trim(),
        update_product_category: updateProductCategory.trim(), // Include category in dispatch
      })
    );

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
        title="Edit Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2 className="text-green-600 mb-1">
          Editing product with id: {productId}
        </h2>

        <label className="font-medium">Product Name:</label>
        <Input
          value={updateProductName}
          onChange={(e) => setUpdateProductName(e.target.value)}
          placeholder="Enter product name"
          className="mb-4"
        />

        <label className="font-medium">Product Description:</label>
        <TextArea
          value={updateProductDescription}
          onChange={(e) => setUpdateProductDescription(e.target.value)}
          placeholder="Enter product description"
          autoSize={{ minRows: 4, maxRows: 6 }}
          className="mb-4"
        />

        <label className="font-medium">Product Price:</label>
        <Input
          value={updateProductPrice}
          onChange={(e) => setUpdateProductPrice(e.target.value)}
          placeholder="Enter product price"
          className="mb-4"
        />

        <label className="font-medium">Product Quantity:</label>
        <Input
          value={updateProductQuantity}
          onChange={(e) => setUpdateProductQuantity(e.target.value)}
          placeholder="Enter product quantity"
          className="mb-4"
        />

        <label className="font-medium">Product Category:</label>
        <Select
          className="mb-4 w-full"
          placeholder="Select a product category"
          value={updateProductCategory}
          onChange={(value) => setUpdateProductCategory(value)}
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
              value: "grain",
              label: "Grains",
            },
          ]}
        />

        <label className="font-medium">Product Image:</label>
        <Input
          value={updateProductImage}
          onChange={(e) => setUpdateProductImage(e.target.value)}
          placeholder="Enter product image URL"
          className="mb-4"
        />

        <label className="font-medium">Stock Status:</label>
        <Select
          className="mb-4 w-full"
          placeholder="Select Stock Status"
          value={updateStockStatus}
          onChange={(value) => setUpdateStockStatus(value)}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: "in-stock",
              label: "In Stock",
            },
            {
              value: "out-of-stock",
              label: "Out of Stock",
            },
          ]}
        />
      </Modal>
    </>
  );
}

export default EditProduct;
