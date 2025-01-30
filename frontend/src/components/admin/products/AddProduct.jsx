import { Input, Button, Select, InputNumber } from "antd";
import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { serverUrl } from "../../../utils/helper";
import { addProduct } from "../../../features/product/productSlice";
import { useDispatch } from "react-redux";
import BackButton from "../../ui/buttons/BackButton";

const AddProduct = () => {
  const [productFormData, setProductFormData] = useState({
    product_name: "",
    product_price: 0,
    product_description: "",
    product_category: "",
    product_image: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //   function to create product
  async function handleAddProduct() {
    if (
      validator.isEmpty(productFormData.product_name, {
        ignore_whitespace: true,
      })
    ) {
      return alert("Please provide a product name");
    }
    if (
      validator.isEmpty(productFormData.product_description, {
        ignore_whitespace: true,
      })
    ) {
      return alert("Please provide a description name");
    }

    if (productFormData.product_price < 1) {
      return alert("Please provide a product price");
    }

    if (
      validator.isEmpty(productFormData.product_category, {
        ignore_whitespace: true,
      })
    ) {
      return alert("Please provide a product category");
    }

    if (!validator.isURL(productFormData.product_image)) {
      return alert("Please provide a product image");
    }

    console.log("Here");

    setIsLoading(true);
    // Now we can register the user successfully
    try {
      const response = await axios.post(
        `${serverUrl}/product/create-product`,
        productFormData
      );

      if (response.data.status === "success") {
        console.log(response);
        dispatch(addProduct(response.data.product));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(productFormData);

  return (
    <div className="flex items-center justify-center flex-col w-full min-h-screen">
      <BackButton />
      <form className="flex flex-col gap-4 w-full max-w-[500px] border p-4 rounded-lg">
        <h3 className="text-2xl text-blue-800 text-center">Add a Product</h3>

        <Input
          onChange={(e) =>
            setProductFormData({
              ...productFormData,
              product_name: e.target.value,
            })
          }
          placeholder="Enter product name"
          size="large"
        />
        <Input
          onChange={(e) =>
            setProductFormData({
              ...productFormData,
              product_description: e.target.value,
            })
          }
          placeholder="Enter product description"
          size="large"
        />
        <InputNumber
          onChange={(value) =>
            setProductFormData({
              ...productFormData,
              product_price: value,
            })
          }
          style={{
            width: "100%",
          }}
          placeholder="Enter a product price"
          size="large"
        />
        <Select
          showSearch
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
          onChange={(value) =>
            setProductFormData({
              ...productFormData,
              product_category: value,
            })
          }
        />
        <Input
          onChange={(e) =>
            setProductFormData({
              ...productFormData,
              product_image: e.target.value,
            })
          }
          placeholder="Enter a product image url"
          size="large"
        />

        <Button onClick={handleAddProduct} loading={isLoading} type="primary">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
