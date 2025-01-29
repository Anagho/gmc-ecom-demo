import React from 'react'
import { formatCurrency } from '../../utils/helper';

const Announcement = () => {
  return (
    <section className="text-sm text-gray-700 py-4 hidden sm:block">
      <div className="container mx-auto flex justify-between items-center px-4 text-[0.9rem]">
        {/* Left Section */}
        <p className="font-medium">
          Free shipping on all orders over{" "}
          <span className="font-semibold text-green-600">
            {formatCurrency(5000)}
          </span>
        </p>
        {/* Right Section */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-green-600">
            Become A Vendor
          </a>
          <a href="#" className="hover:text-green-600">
            Order Tracking
          </a>
          <a href="#" className="hover:text-green-600">
            My Wishlist
          </a>
        </div>
      </div>
    </section>
  );
}

export default Announcement