import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import BottomNavbar from "../common/BottomNavbar";
import Footer from "../common/Footer";
import { SIDEBAR_NAVS } from "../../constants/navigation";
import { ReactNode } from "react";

interface ILayoutProps {
  children?: ReactNode; // Adding children prop for the Layout
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block md:w-1/5 lg:w-1/4 xl:w-1/5 fixed h-full">
          <Sidebar links={SIDEBAR_NAVS} />
        </div>
        <div className="flex-1 md:ml-[22%] lg:ml-[25%] xl:ml-[20%]">
          {children || <Outlet />}{" "}
          {/* This will render the matched child route component */}
        </div>
      </div>
      <div className="md:hidden fixed inset-x-0 bottom-0 z-10">
        <BottomNavbar links={SIDEBAR_NAVS} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
