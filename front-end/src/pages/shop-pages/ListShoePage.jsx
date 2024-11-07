import React from "react";
import api from "@/config/axios";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoIosSearch } from "react-icons/io";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BiSolidDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import ComboBoxOrderBy from "../../components/shop/ComboBoxOrderBy";

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

export default function ListShoePage() {
  return (
    <main className="container mx-auto bg-white rounded-sm">
      <div className="flex p-4">
        <div className="w-1/3 me-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Brand</AccordionTrigger>
              <AccordionContent>Nike</AccordionContent>
              <AccordionContent>Adidas</AccordionContent>
              <AccordionContent>Puma</AccordionContent>
              <AccordionContent>Reebok</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>Running</AccordionContent>
              <AccordionContent>Casual</AccordionContent>
              <AccordionContent>Sport</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Gender</AccordionTrigger>
              <AccordionContent>MAN</AccordionContent>
              <AccordionContent>WOMEN</AccordionContent>
              <AccordionContent>UNISEX</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>6</AccordionContent>
              <AccordionContent>7</AccordionContent>
              <AccordionContent>8</AccordionContent>
              <AccordionContent>9</AccordionContent>
              <AccordionContent>10</AccordionContent>
              <AccordionContent>11</AccordionContent>
              <AccordionContent>12</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex-col">
          <div className="mb-8 mt-4 flex justify-between">
            <div className="relative w-1/3 flex">
              <Input placeholder="Search" />
              <Button variant="ghost" className="absolute right-1 hover:bg-stone-950 hover:text-stone-200">
                <IoIosSearch className="w-6 h-6" />
              </Button>
            </div>
            <div>
              <ComboBoxOrderBy/>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteShoes.map((shoe) => (
              <Card
                key={shoe.id}
                className="hover:border-stone-950 cursor-pointer"
              >
                <CardHeader>
                  <CardTitle>{shoe.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={shoe.image} alt="" />
                  <p className="text-xl font-bold mt-2">{shoe.price}</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button className="cursor-pointer hover:bg-slate-500 hover:text-slate-950">
                    <BiSolidDetail className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="destructive"
                    className="cursor-pointer hover:text-stone-950"
                  >
                    <FiShoppingBag className="w-6 h-6" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
