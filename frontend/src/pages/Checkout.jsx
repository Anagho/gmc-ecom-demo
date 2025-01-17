import {useState} from "react";
import DeliveryInfo from "../components/checkout/DeliveryInfo";
import Payment from "../components/checkout/Payment";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Checkout = () => {
  const { userCartSummary } = useSelector((state) => state.cart);
  const [customerDeliveryInfo, setCustomerDeliveryInfo] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
  });
  console.log(customerDeliveryInfo)
  if (userCartSummary.totalCartItems < 1 || userCartSummary.totalAmount < 1) {
    return <Navigate to={"/"} />;
  }

  // handle user input for delivery
  function handleInput(e) {
    const { name, value } = e.target;
    setCustomerDeliveryInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  return (
    <div className="max-w-[1100px] mx-auto py-16 px-4">
      <DeliveryInfo
        customerName={customerDeliveryInfo.customerName}
        email={customerDeliveryInfo.email}
        phoneNumber={customerDeliveryInfo.phoneNumber}
        deliveryAddress={customerDeliveryInfo.deliveryAddress}
        handleInput={handleInput}
      />

      <Payment customerDeliveryInfo={customerDeliveryInfo} />
    </div>
  );
};

export default Checkout;
