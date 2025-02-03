import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import axios from "axios";
import { serverUrl } from "../../utils/helper";
import { setProducts } from "../../features/product/productSlice";
import { useDispatch } from "react-redux";

function AllProducts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/product/all-products`);

      // console.log(response.data);
      dispatch(setProducts(response.data.products));
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-60 bg-gray-100">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-semibold animate-pulse">
            Loading store products...
          </h1>
        </div>
      );
    }

  return (
    <section>
      <ProductList />
    </section>
  );
}

export default AllProducts;
