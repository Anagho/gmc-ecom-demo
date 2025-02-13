import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Spin } from "antd";
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
         <div className="flex justify-center items-center">
           <Spin size="large" />
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
