import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const AdminLayout = () => {
  return (
    <>
      <SideBar />
      <TopBar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
