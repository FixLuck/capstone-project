import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="mt-32">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
