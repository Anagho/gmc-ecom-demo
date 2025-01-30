import React, { useEffect } from "react";
import ProductList from "./ProductList";
import axios from "axios";
import { serverUrl } from "../../utils/helper";
import { setProducts } from "../../features/product/productSlice";
import { useDispatch } from "react-redux";

function AllProducts() {
  const dispatch = useDispatch();

  async function getProducts() {
    try {
      const response = await axios.get(`${serverUrl}/product/all-products`);

      // console.log(response.data);
      dispatch(setProducts(response.data.products));
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <ProductList />
    </section>
  );
}

export default AllProducts;
