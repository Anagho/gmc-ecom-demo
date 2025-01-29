import React from "react";
import AllCustomersOrders from "../../components/admin/orders/AllCustomersOrders";
import { Link } from "react-router";

const Admin = () => {
  return (
    <section>
      <Link to={"/admin/add-product"}>Create a Product</Link>
      <AllCustomersOrders />
    </section>
  );
};

export default Admin;
