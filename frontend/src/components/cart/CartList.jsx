import React from "react";
import CartItemCard from "./CartItemCard";

import { useSelector } from "react-redux";
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center text-center">
        <ShoppingCart size={100} className="text-gray-400 mb-4" />
        <h2 className="text-3xl text-gray-400 font-semibold mb-10">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          className="text-gray text-sm md:text-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-700 duration-200 py-2 px-4 rounded-lg"
          to={"/products"}
        >
          Shop Now!
        </Link>
      </div>
    );
  }
  return (
    <section>
      {cartItems.map((item) => {
        return (
          <CartItemCard
            key={item.product_id}
            product_id={item.product_id}
            product_image={item.product_image}
            product_name={item.product_name}
            product_price={item.product_price}
            product_quantity={item.product_quantity}
          />
        );
      })}
    </section>
  );
};

export default CartList;
