import React from "react";
import AllCustomersOrders from "../../components/admin/orders/AllCustomersOrders";
import AllStoreProducts from "../../components/admin/products/AllStoreProducts";

const Admin = () => {
  return (
    <section>
      <AllCustomersOrders />
      <AllStoreProducts />
    </section>
  );
};

export default Admin;
