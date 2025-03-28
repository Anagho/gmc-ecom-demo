import React from 'react'

import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";
import WishListCard from './WishListCard';

const WishList = () => {
  const {wishlistItems} = useSelector((state) => state.wishlist)

   if (wishlistItems.length === 0) {
      return (
        <div className="flex flex-col items-center text-center">
          <Heart size={100} className="text-gray-400 mb-4" />
          <h2 className="text-3xl text-gray-400 font-semibold mb-10">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Link
            className="text-gray text-sm md:text-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-700 duration-200 py-2 px-4 rounded-lg"
            to={"/products"}
          >
            Shop Now!
          </Link>
        </div>
      );
    }
  return (
    <section>
      {wishlistItems.map((item) => {
        return (
          <WishListCard
            key={item.product_id}
            product_id={item.product_id}
            product_image={item.product_image}
            product_name={item.product_name}
            product_price={item.product_price}
            product_quantity={item.product_quantity}
          />
        );
      })}
    </section>
  );
}

export default WishList