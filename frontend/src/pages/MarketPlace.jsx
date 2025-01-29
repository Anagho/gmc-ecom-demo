import React from "react";
import AllProducts from "../components/products/AllProducts";

function MarketPlace() {
  return (
    <section className="container mx-auto p-4 py-24 lg:py-16">
      <h1 className="text-3xl font-semibold mb-8 text-slate-800">
        Shop Fresh Farm Products
      </h1>
      <AllProducts />
    </section>
  );
}

export default MarketPlace;
