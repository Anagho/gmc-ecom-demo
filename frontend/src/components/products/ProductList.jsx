import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function ProductList() {
  const { products } = useSelector((state) => state.products);

  // console.log(products)
  return (
    <section className="flex gap-4 sm:gap-6 md:gap-8 flex-wrap">
      {products.map((item) => {
        return (
          <ProductCard
            key={item._id}
            product_id={item._id}
            product_name={item.product_name}
            product_price={item.product_price}
            product_image={item.product_image}
          />
        );
      })}
    </section>
  );
}

export default ProductList;
