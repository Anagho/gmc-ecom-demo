import React from "react";
import CartItemCard from "./CartItemCard";

import { useSelector } from "react-redux";
import { Link } from "react-router";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);

  if (cartItems.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-10">Sorry No Item in Cart yet</h1>
        <Link
          className="text-gray text-xl underline-offset-[10px] underline text-gray-500 hover:text-black"
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
