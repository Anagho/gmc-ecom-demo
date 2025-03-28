import { Minus, Plus } from "lucide-react";
import React from "react";
import { formatCurrency } from "../../utils/helper";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  clearWishlist,
} from "../../features/wishlist/WishlistSlice";
import { useDispatch } from "react-redux";

const WishListCard = ({
  product_name,
  product_image,
  product_price,
  product_id,
  product_quantity,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-6 bg-gray-100 p-2 items-center">
      <img src={product_image} alt={product_name} />

      <section>
        <div>
          <h3 className="text-base md:text-lg font-medium">{product_name}</h3>
          <p className="text-gray-500 font-light">
            <span className="mr-2">{formatCurrency(product_price)}</span> X S
            <span className="ml-2">{product_quantity}</span>
            <span className="block font-semibold">
              {formatCurrency(product_price * product_quantity)}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default WishListCard;
