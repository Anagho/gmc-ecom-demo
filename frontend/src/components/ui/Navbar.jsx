import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart)
  return (
    <nav className="shadow-md bg-white sticky top-0 z-[999]">
      <section className="container mx-auto flex justify-between items-center p-4">
        <NavLink to={"/"}>
          <h1 className="font-bold tracking-wide text-2xl text-green-800">Farmgry</h1>
        </NavLink>
        <div className="flex gap-4 text-gray-500 font-medium">
          <NavLink
            className={
              "hover:text-black transition-colors duration-500 text-lg"
            }
            to={"/products"}
          >
            Marketplace
          </NavLink>
          <NavLink
            className={"hover:text-black relative transition-colors duration-500"}
            to={"/cart"}
          >
            <ShoppingCart strokeWidth={2.5} />
            <p className="bg-red-500 absolute -top-4 right-0 px-1 text-white rounded-lg text-center text-xs">{cartItems.length}</p>
          </NavLink>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
