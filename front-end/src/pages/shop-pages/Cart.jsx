
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
    <div>
    <div className="container mx-auto p-6 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <Card key={item.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-contain bg-gray-100"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current text-red-500' : ''}`} />
                        <span className="text-sm">Add to Favorites</span>
                      </button>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold">${item.price}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">Order summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Original price</span>
                  <span>${totals.originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Savings</span>
                  <span>-${totals.savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Store Pickup</span>
                  <span>${totals.storePickup.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${totals.tax.toFixed(2)}</span>
                </div>
                
                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                Proceed to Checkout
              </Button>
              
              <div className="text-center mt-4">
                <span className="text-gray-600">or</span>
                <button className="ml-2 text-blue-600 hover:underline">
                  Continue Shopping
                </button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Do you have a voucher or gift card?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 border rounded-md"
                    placeholder="Enter code"
                  />
                  <Button variant="outline">
                    Apply Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
    </div>

  )
}
