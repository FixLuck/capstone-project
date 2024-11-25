import React from "react";
import RevenueTabs from "./RevenueTabs";

export default function RevenuePage() {
  return (
    <div className="p-8 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Revenue Dashboard</h1>
      <RevenueTabs />
    </div>
  );
}
