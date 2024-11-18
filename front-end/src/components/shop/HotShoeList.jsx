import React from "react";
import { FaFire } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { BiSolidDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";


let favoriteShoes = [
  {
    id: 1,
    name: "Adidas",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c608f554cb3b4d12b392af000188c513_9366/ULTRABOOST_1.0_SHOES_Black_HQ4199_01_00_standard.jpg",
    price: "$100.00",
  },
  {
    id: 2,
    name: "Adidas",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c608f554cb3b4d12b392af000188c513_9366/ULTRABOOST_1.0_SHOES_Black_HQ4199_01_00_standard.jpg",
    price: "$100.00",
  },
  {
    id: 3,
    name: "Adidas",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c608f554cb3b4d12b392af000188c513_9366/ULTRABOOST_1.0_SHOES_Black_HQ4199_01_00_standard.jpg",
    price: "$100.00",
  },
  {
    id: 4,
    name: "Adidas",
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c608f554cb3b4d12b392af000188c513_9366/ULTRABOOST_1.0_SHOES_Black_HQ4199_01_00_standard.jpg",
    price: "$100.00",
  },
];

export default function HotShoeList() {
  return (
    <div className="bg-white rounded-sm p-4 my-4">
      <div className="flex">
        <p className="text-3xl font-bold me-2 items-center">Yêu thích nhất</p>
        <FaFire className="w-8 h-8 text-red-500" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
        {favoriteShoes.map((shoe) => (
          <Card key={shoe.id} className="hover:border-stone-950 cursor-pointer">
            <CardHeader>
              <CardTitle>{shoe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={shoe.image} alt="" />
              <p className="text-xl font-bold mt-2">{shoe.price}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button className='cursor-pointer hover:bg-slate-500 hover:text-slate-950'>
                <BiSolidDetail className="w-6 h-6" />
              </Button>
              <Button variant="destructive" className='cursor-pointer hover:text-stone-950'>
                <FiShoppingBag className="w-6 h-6"/>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
