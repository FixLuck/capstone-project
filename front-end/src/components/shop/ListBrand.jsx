import React from "react";

let brand = [
  {
    name: "Adidas",
    logoUrl: "/adidas-logo.png",
  },
  {
    name: "Puma",
    logoUrl: "/puma-logo.png",
  },
  {
    name: "Reebok",
    logoUrl: "/reebok-logo.png",
  },
  {
    name: "Nike",
    logoUrl: "/nike-logo.png",
  },
];

export default function ListBrand() {
  return (
    <div className="bg-white my-4 py-4 rounded-sm">
      <div className="text-3xl text-center font-semibold underline underline-offset-8 mb-16">
        Select Your Brand
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {brand.map((item, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <img src={`/brand-images/${item.logoUrl}`} alt="" className="w-20 h-20" />
            <div className="font-bold text-2xl">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
