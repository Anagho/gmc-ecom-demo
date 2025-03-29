import React from "react";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import { useSelector } from "react-redux";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <section className="container mx-auto py-4 md:py-8 px-4 flex justify-center items-center flex-col w-full">
      {cartItems.length > 0 && (
        <h1 className="text-3xl lg:text-5xl py-2">Your cart items</h1>
      )}

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className={!cartItems.length > 0 ? "w-full" : "lg:w-[60%]"}>
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

export default CartPage;
