import React from "react";
import { Outlet } from "react-router-dom";
import DoubleNavbar from "../sidebar/DoubleNavbar";

export default function ProtectedLayout() {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      <DoubleNavbar />
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
