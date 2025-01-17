import React from "react";
import { Input } from "antd";

const DeliveryInfo = ({
  customerName,
  email,
  phoneNumber,
  deliveryAddress,
  handleInput,
}) => {
  return (
    <section>
      <h3 className="text-4xl mb-4">Complete Your Order</h3>
      <p className="text-lg text-gray-500 font-light">
        Enter your delivery information to make payment and confirm your order.
      </p>
      <form className="flex flex-col gap-6 my-8 bg-gray-50 p-2 md:p-10">
        <Input
          name="customerName"
          value={customerName}
          onChange={handleInput}
          placeholder="Your name"
          size="large"
        />
        <Input
          name="email"
          value={email}
          onChange={handleInput}
          placeholder="Email address"
          size="large"
        />
        <Input
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleInput}
          placeholder="Phone number"
          size="large"
        />
        <Input
          name="deliveryAddress"
          value={deliveryAddress}
          onChange={handleInput}
          placeholder="Delivery address"
          size="large"
        />
      </form>
    </section>
  );
};

export default DeliveryInfo;
