import React from "react";
import RevenueTabs from "./RevenueTabs";

export default function RevenuePage() {
  return (
    <div className="p-6 max-w-full h-screen mx-auto bg-white rounded-lg shadow-md ">
      <h1 className="text-2xl font-bold mb-4">Bảng doanh thu</h1>
      <RevenueTabs />
    </div>
  );
}
