import { Outlet, useLocation } from "react-router";
import Navbar from "../components/ui/Navbar";
import Announcement from "../components/ui/Announcement";

function MainLayout() {
  const location = useLocation();
  return (
    <div>
      {!location.pathname.includes("admin") &&
        !location.pathname.includes("login") &&
        !location.pathname.includes("register") &&
        !location.pathname.includes("verify-email") && <Announcement />}
      {!location.pathname.includes("admin") &&
        !location.pathname.includes("login") &&
        !location.pathname.includes("register") &&
        !location.pathname.includes("verify-email") && <Navbar />}
      <Outlet />
    </div>
  );
}

export default MainLayout;
