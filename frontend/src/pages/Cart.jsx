import React from "react";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import { useSelector } from "react-redux";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <section className="max-w-[1000px] mx-auto py-16 lg:py-24 px-4 flex justify-center items-center flex-col">
      {cartItems > 0 && (
        <h1 className="text-3xl lg:text-5xl">Your cart items</h1>
      )}

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-[60%]">
          <CartList />
        </div>
        {/* Render CartSummary only if cart has items */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-[40%]">
            <CartSummary />
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
