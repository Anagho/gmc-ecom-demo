import { NavLink } from "react-router";

const Logo = () => {
  return (
    <NavLink to={"/"}>
      <h2 className="font-extrabold font-lora text-2xl text-center bg-gradient-to-r from-green-700 to-emerald-800 text-transparent bg-clip-text">
        Farmgry🌿
      </h2>
    </NavLink>
  );
};

export default Logo;
