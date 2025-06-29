"use client";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileSideBar from "./MobileSidebar";

const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <div className="flex min-h-screen max-w-screen overflow-hidden">
      <div className="w-1/5 fixed left-0 top-0 h-full hidden lg:block">
        <Sidebar />
      </div>
      <div className="fixed w-full lg:w-4/5 h-screen overflow-hidden right-0 top-0 flex flex-col">
        <div className="lg:hidden sticky top-0 left-0 w-full z-50">
          <Header openMenu={openMobileMenu} setOpenMenu={setOpenMobileMenu} />
        </div>
        <div className="overflow-y-scroll flex-1 bg-[#F9FAFB]">{children}</div>
      </div>
      <MobileSideBar isOpen={openMobileMenu} onClose={setOpenMobileMenu} />
    </div>
  );
};

export default PageLayout;
