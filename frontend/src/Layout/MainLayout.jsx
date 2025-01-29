import { Outlet, useLocation} from "react-router";
import Navbar from "../components/ui/Navbar";
import Announcement from "../components/ui/Announcement";

function MainLayout() {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
