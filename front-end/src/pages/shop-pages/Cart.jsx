import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Minus, Plus, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'PC system All in One APPLE iMac (2023) mqrq3ro/a',
      description: 'Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
      price: 1499,
      quantity: 2,
      image: '/api/placeholder/200/150'
    },
    {
      id: 2,
      name: 'Restored Apple Watch Series 8 (GPS)',
      description: '41mm Midnight Aluminum Case with Midnight Sport Band',
      price: 598,
      quantity: 1,
      image: '/api/placeholder/150/150'
    },
    {
      id: 3,
      name: 'Apple - MacBook Pro 16" Laptop',
      description: 'M3 Pro chip, 36GB Memory, 18-core GPU, 512GB SSD, Space Black',
      price: 1799,
      quantity: 1,
      image: '/api/placeholder/200/150'
    },
    {
      id: 4,
      name: 'Tablet APPLE iPad Pro 12.9" 6th Gen',
      description: '128GB, Wi-Fi, Gold',
      price: 699,
      quantity: 1,
      image: '/api/placeholder/150/200'
    }
  ]);

  const [favorites, setFavorites] = useState([]);

  const updateQuantity = (id, increment) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + increment);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const calculateTotals = () => {
    const originalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const savings = 299;
    const storePickup = 99;
    const tax = 799;
    const total = originalPrice - savings + storePickup + tax;

    return {
      originalPrice,
      savings,
      storePickup,
      tax,
      total
    };
  };

  const totals = calculateTotals();
  return (
    <div className="bg-white h-full mb-10 p-10">
        <h1 className="" align="center"></h1>
        <div className="mt-10 p-10">


        <Table className="">
          <TableCaption>A list of your cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Image</TableHead>
              <TableHead className="w-[250px]">Product Name</TableHead>
              <TableHead className="w-[150px]">Quantity</TableHead>
              <TableHead className="w-[200px]">Unit Price</TableHead>
              <TableHead className="w-[200px]">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div>image here</div>
              </TableCell>
              <TableCell>
                <div>
                  <div>kd 15</div>
                  <div>size 9 male</div>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  className="bg-white"
                  type="number"
                  min={0}
                  defaultValue={1}
                  max={10}
                />
              </TableCell>
              <TableCell>150$</TableCell>
              <TableCell>300$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
        <div className="sm:col-span-8"></div>
        <div className="sm:col-span-4 me-10">
          <Textarea className="bg-white" placeholder="Total" />
        </div>
      </div>
    </div>
  )
}
