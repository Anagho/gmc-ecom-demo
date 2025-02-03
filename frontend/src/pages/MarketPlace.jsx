import React from "react";
import AllProducts from "../components/products/AllProducts";

function MarketPlace() {
  return (
    <section className="container mx-auto px-2 sm:px-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg py-6 md:py-10 ">
      <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-8 text-slate-800">
        Shop Fresh Farm Products
      </h1>
      <AllProducts />
    </section>
  );
}

export default MarketPlace;
