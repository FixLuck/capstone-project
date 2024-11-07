import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminAside from "@/components/admin-com/AdminAside";

export default function RootLayoutAdmin() {
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <div className="relative h-screen">
      {/* Toggle Button for All Screen Sizes */}
      <button
        onClick={toggleAside}
        className="absolute top-1 left-1 z-50 px-4 py-1 bg-black hover:text-red-400 hover:text-sm text-white rounded-md focus:outline-none"
      >
        {isAsideOpen ? "Close" : "Open"}
      </button>

      {/* Responsive Grid Layout */}
      <div className={`grid h-full transition-all duration-300 ease-in-out ${isAsideOpen ? "sm:grid-cols-12" : "sm:grid-cols-1"}`}>
        {/* Sidebar */}
        {isAsideOpen && (
          <div className="col-span-2 bg-black transition-transform duration-300 ease-in-out">
            <AdminAside />
          </div>
        )}

        {/* Main Content Area */}
        <div className={`overflow-auto ${isAsideOpen ? "col-span-10" : "col-span-12"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
