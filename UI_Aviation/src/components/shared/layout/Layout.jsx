import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      {/* <Navbar />  */}
      <div className="flex-1 p-3 min-h-0 overflow-auto drop-shadow-2xl">{<Outlet />}</div>
    </div>
  );
}

export default Layout;
