import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { updateUser } from "../../features/user/userSlice";
import Filter from "./Filter";

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // const [searchValue, setSearchValue] = useState('');
  // const [selectedFilter, setSelectedFilter] = useState('all');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter options
  const productOptions = [
    { label: "All category", value: "all" },
    { label: "Fruits", value: "fruits" },
    { label: "Vegetables", value: "vegetables" },
    { label: "Dairy", value: "dairy" },
    { label: "Grains", value: "grains" },
  ];

  function handleUserLogout() {
    localStorage.removeItem("user");
    dispatch(updateUser(null));
    navigate("/");
  }

  return (
    <nav className="shadow-md bg-white sticky top-0 z-[999]">
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4">
        {/* Logo */}
        <NavLink to={"/"}>
          <h1 className="font-bold text-3xl text-green-800 font-sans">
            Farmgry
          </h1>
        </NavLink>

        {/* Filter and Search Bar */}
        <Filter productOptions={productOptions} />

        {/* Navbar Links */}
        <div className="flex gap-4 text-gray-500 font-medium items-center">
          <NavLink
            className={
              "hover:text-black transition-colors duration-500 text-lg"
            }
            to={"/products"}
          >
            Store
          </NavLink>
          {user === null ? (
            <NavLink
              className={
                "hover:text-black transition-colors duration-500 text-lg"
              }
              to={"/login"}
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleUserLogout}
              className="hover:text-black transition-colors duration-500 text-lg"
            >
              Logout
            </button>
          )}

          {user !== null && (
            <div className="bg-blue-800 p-1 rounded-md text-white font-medium">
              <p className="text-2xl">{user.name.slice(0, 1)}</p>
            </div>
          )}

          {user !== null && user.userType === "admin" ? (
            <NavLink to={"/admin"}>Admin</NavLink>
          ) : (
            <NavLink
              className={
                "hover:text-black relative transition-colors duration-500"
              }
              to={"/cart"}
            >
              <ShoppingCart strokeWidth={2.5} />
              <p className="bg-orange-500 absolute -top-4 right-0 px-1 text-white rounded-lg text-center text-xs">
                {cartItems.length}
              </p>
            </NavLink>
          )}
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
