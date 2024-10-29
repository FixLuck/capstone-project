

import CarouselHomePage from "@/components/shop/CarouselHomePage";
import React from "react";
import ListBrand from "../../components/shop/ListBrand";
import HotShoeList from "../../components/shop/HotShoeList";

export default function HomePage() {


  return (
    <div className="container mx-auto justify-center ">
      <CarouselHomePage/>
      <ListBrand/>
      <HotShoeList/>
      <HotShoeList/>
      <HotShoeList/>
    </div>
  );
}
