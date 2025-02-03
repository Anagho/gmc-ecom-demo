import React from "react";
import AllProducts from "../components/products/AllProducts";

function MarketPlace() {
  return (
    <section className="container p-2 py-6 md:py-10 mx-auto">
      <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-8 text-slate-800">
        Shop Fresh Farm Products
      </h1>
      <AllProducts />
    </section>
  );
}

export default MarketPlace;
