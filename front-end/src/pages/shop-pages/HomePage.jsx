
import CarouselHomePage from "@/components/shop/CarouselHomePage";
import React from "react";
import ListBrand from "../../components/shop/ListBrand";
import HotShoeList from "../../components/shop/HotShoeList";
import api from "@/config/axios";


export default function HomePage() {

  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    const fetchBrands = async () => {
      try {
        const {data} = await api.get("brands");
        console.log(data.result);
        
        setBrands(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrands();
  }, [])


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
