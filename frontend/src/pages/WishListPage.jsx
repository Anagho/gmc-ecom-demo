import React from 'react'
import { useSelector } from 'react-redux'
import WishList from '../components/wishlist/WishList';

const WishListPage = () => {
    const {wishlistItems} = useSelector((state) => state.wishlist)
  return (
    <section className="container mx-auto py-4 md:py-8 px-4 flex justify-center items-center flex-col">
      {wishlistItems.length > 0 && (
        <h1 className="text-3xl lg:text-5xl py-2">Your wishlist items</h1>
      )}

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-[60%]">
          <WishList />
        </div>

        {/* Render CartSummary only if cart has items */}
        {wishlistItems.length > 0 && (
          <div className="w-full lg:w-[40%]">
            <WishListSummary />
          </div>
        )}
      </div>
    </section>
  );
}

export default WishListPage