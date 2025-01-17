import { Minus, Plus } from "lucide-react";
import React from "react";
import { formatCurrency } from "../../utils/helper";
import {
  removeItemFromCart,
  increaseCartItemQty,
  decreaseCartItemQty,
} from "../../features/cart/CartSlice";
import { useDispatch } from "react-redux";

const CartItemCard = ({
  product_name,
  product_image,
  product_quantity,
  product_id,
  product_price,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-6 bg-gray-100 p-2 items-center">
      <img className="w-28" src={product_image} alt={product_name} />

      <div>
        <div>
          <h3 className="text-base md:text-lg font-medium">{product_name}</h3>
          <p className="text-gray-500 font-light">
            <span className="mr-2">{formatCurrency(product_price)}</span> X{" "}
            <span className="ml-2">{product_quantity}</span>
          </p>
        </div>

        <div className="flex justify-between mt-6 gap-4">
          <div className="text-gray-600 flex items-center border gap-4 p-2 bg-white ">
            <button
              className="bg-transparent outline-none border-none"
              onClick={() => dispatch(decreaseCartItemQty(product_id))}
            >
              <Minus />
            </button>
            <span>{product_quantity}</span>
            <button
              className="bg-transparent outline-none border-none"
              onClick={() => dispatch(increaseCartItemQty(product_id))}
            >
              <Plus />
            </button>
          </div>

          <button
            onClick={() => dispatch(removeItemFromCart(product_id))}
            className="underline-offset-[10px] underline text-gray-500 font-medium hover:text-black bg-transparent border-none"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
