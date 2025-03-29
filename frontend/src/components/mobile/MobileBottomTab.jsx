import { Heart, Home, ShoppingCart, Store, User2 } from "lucide-react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";



const MobileBottomTab = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth)

  console.log("cartItems:", cartItems);
  console.log("wishlistItems:", wishlistItems);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-50 shadow-md z-[800] lg:hidden">
      <div className="flex justify-around py-2">
        <TabItem icon={<Home size={24} />} label="Home" path="/" />
        <TabItem icon={<Store size={24} />} label="Store" path="/products" />
        <TabItem
          icon={<Heart size={24} />}
          label="Wishlist"
          path="/wishlist"
          badge={wishlistItems?.length || 0}
        />
        <TabItem
          icon={<ShoppingCart size={24} />}
          label="Cart"
          path="/cart"
          badge={cartItems?.length || 0}
        />
        <TabItem
          icon={<User2 size={24} />}
          label="Account"
          path={user ? "/profile" : "/login"}
        />
      </div>
    </div>
  );
};

export default MobileBottomTab;

// Helper function
const TabItem = ({ icon, label, path, badge }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => `
     flex flex-col items-center transition duration-200 ${
       isActive ? "text-emerald-700" : "text-gray-600 hover:text-green-600"
     }`}
    >
      <div className="relative">
        {icon}

        <span className="bg-emerald-500 absolute -top-1 left-4 px-1 text-white rounded-full text-center text-xs">
          {badge}
        </span>
      </div>
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};
