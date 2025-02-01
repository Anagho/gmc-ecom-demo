import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button, message } from "antd";
import { formatCurrency } from "../../utils/helper";
import { addItemToCart } from "../../features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../ui/buttons/BackButton";

const ProductInfo = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [messageApi, contextHolder] = message.useMessage();

  // console.log(products)

  
  useEffect(() => {
    const product = products.find(
        (item) => item._id === params.product_id
      );

    setSingleProduct(product);
  }, []);

  if (singleProduct === null) {
    return (
      <div>
        <h1 className="text-4xl text-gray-500 animate-none p-4">
          Loading product info
        </h1>
      </div>
    );
  }

  // Function to add item to cart
  function handleAddItemToCart() {
    const productInCart = cartItems.find(
      (item) => item.product_id === singleProduct.product_id
    );

    if (productInCart === undefined) {
      dispatch(addItemToCart(singleProduct));
      messageApi.success("Item added to cart successfully");
    } else {
      messageApi.error("Product already in cart");
    }
  }

  return (
    <section className="p-4">
      {contextHolder}
      <BackButton />
      <div className="flex flex-col md:flex-row gap-8 border p-4 bg-gray-50 rounded-md">
        {/* Left Section */}
        <div className="flex flex-col items-center gap-4 md:w-1/2">
          <img
            className="w-full max-w-[400px] rounded-md object-cover"
            src={singleProduct.product_image}
            alt={singleProduct.product_name}
          />
          <Button
            onClick={handleAddItemToCart}
            type="primary"
            size="large"
            color="orange"
            variant="solid"
            block
          >
            Add to Cart
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center gap-4 md:w-1/2">
          <h1 className="text-4xl font-bold">{singleProduct.product_name}</h1>
          <p className="text-2xl font-medium">
            {formatCurrency(singleProduct.product_price)}
          </p>
          <p className="text-lg text-gray-500">
            {singleProduct.product_description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
