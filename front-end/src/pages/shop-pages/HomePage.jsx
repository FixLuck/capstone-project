import CarouselHomePage from "@/components/shop/CarouselHomePage";
import React, { useEffect } from "react";
import ListBrand from "../../components/shop/ListBrand";
import HotShoeList from "../../components/shop/HotShoeList";
import api from "@/config/axios";
import { useState } from "react";





export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [cheapeastShoes, setCheapestShoes] = useState([]);
  const [topSellers, setTopSellers] = useState([]);

  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);

  useEffect(() => {
    const fetchShoeCollections = async () => {
      try {
        const newShoes = await api.get("/shoes/list-shoes", {
          params: {
            sortOrder: "date_desc",
            page,
            size,
          },
        });

        setNewArrivals(newShoes.data.result.data);

        const cheapList = await api.get("/shoes/list-shoes", {
          params: {
            sortOrder: "asc",
            page,
            size,
          },
        });
        setCheapestShoes(cheapList.data.result.data);
        const topList = await api.get("/shoes/list-shoes", {
          params: {
            sortOrder: "",
            page,
            size,
          },
        });
        setTopSellers(topList.data.result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShoeCollections();
  }, [sortOrder, page, size]);

  console.log(newArrivals);
  console.log(cheapeastShoes);
  console.log(topSellers);

 

  return (
    <div className="container mx-auto justify-center ">
      <CarouselHomePage />
      <ListBrand />
      <HotShoeList shoes={newArrivals} titlte={"Hàng mới về"} />
      <HotShoeList shoes={cheapeastShoes} titlte={"Hàng rẻ nhất"} />
      <HotShoeList shoes={topSellers} titlte={"Hàng bán chạy"} />
      
    </div>
  );
}
