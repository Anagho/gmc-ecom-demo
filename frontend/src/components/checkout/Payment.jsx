import React from "react";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearUserCartItems } from "../../features/cart/CartSlice";
import { serverUrl } from "../../utils/helper";
import axios from 'axios';

const paystack_secret_key = import.meta.env.VITE_PAYSTACK_TEST_KEY;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Payment = ({customerDeliveryInfo}) => {
    const { userCartSummary, cartItems } = useSelector((state) => state.cart);


  const config = {
    reference: new Date().getTime().toString(),
    email: customerDeliveryInfo.email,
    amount: userCartSummary.totalAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: paystack_secret_key
  };
  
const navigate = useNavigate();
const dispatch = useDispatch();

  const initializePayment = usePaystackPayment(config);

  // you can call this function anything
  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    console.log("Payment done successfully!");
    console.log(customerDeliveryInfo);
    console.log(userCartSummary)
    console.log(cartItems)
    /***********/

    try {
      // clear the localStorage
      if (reference) {

        const response = await axios.post(`${serverUrl}/order/create-order`, {
          reference: reference,
          customerDeliveryInfo: customerDeliveryInfo,
          userCartSummary: userCartSummary,
          cartItems: cartItems
        });

        console.log(response)

        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartSummary");
        dispatch(clearUserCartItems());

        alert("Thank you for placing an order!");
        return navigate("/");
      }
    } catch (error) {
      console.log(error) 
    }
   
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    alert("Payment not completed!")
  };

  function handlePaystackPayment() {
    // check if total cart amount is less than 1000
    if (userCartSummary.totalCartAmount < 1000) {
      return alert("Please you can't order items less than 1000");
    }

    // check if user entered a valid email address
    if (emailRegex.test(customerDeliveryInfo.email) === false) {
      return alert("Please enter a valid email");
    }
    console.log("Hello world");

    // use paystack here
    initializePayment({onSuccess, onClose});
  }

  return (
    <div>
      <button className="bg-sky-700 text-white p-2 rounded-md w-full hover:opacity-60 font-semibold border-none"
        onClick={handlePaystackPayment}
      >
        Pay Now!
      </button>
    </div>
  );
};

export default Payment;
