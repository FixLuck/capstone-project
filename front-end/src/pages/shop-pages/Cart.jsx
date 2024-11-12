import React from "react";
import { Minus, Plus, Heart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store";
import { ToastContainer, toast } from "react-toastify";
import { selectItems } from "@/store/cart-slice";
import { Link } from "react-router-dom";
import { formatterToVND } from "../../utils/formatter";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const removeItem = (id) => {
    dispatch(cartActions.removeEntireItemFromCart(id));
  };

  const addToCart = (item) => {
    dispatch(cartActions.addItemToCart(item));
  };

  const removeFromCart = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const calculateTotals = () => {
    const originalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const savings = 299000;
    const storePickup = 99000;
    const tax = originalPrice * 0.1;
    const total = originalPrice - savings + storePickup + tax;

    return {
      originalPrice,
      savings,
      storePickup,
      tax,
      total,
    };
  };

  const totals = calculateTotals();

  if (!items.length) {
    return (
      <div className="container mx-auto p-6 bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <p className="text-gray-600">Your cart is currently empty.</p>
        <Link to="/">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {items.map((item, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-32 h-32 object-contain bg-gray-100"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Size: {item.size}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold">
                      {formatterToVND.format(item.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
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
                  <span>{formatterToVND.format(totals.originalPrice)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Savings</span>
                  <span>-{formatterToVND.format(totals.savings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Store Pickup</span>
                  <span>{formatterToVND.format(totals.storePickup)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatterToVND.format(totals.tax)}</span>
                </div>

                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatterToVND.format(totals.total)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                Proceed to Checkout
              </Button>

              <div className="text-center mt-4">
                <span className="text-gray-600">or</span>
                <Link to="/">
                  <button className="ml-2 text-blue-600 hover:underline">
                    Continue Shopping
                  </button>
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">
                  Do you have a voucher or gift card?
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 border rounded-md"
                    placeholder="Enter code"
                  />
                  <Button variant="outline">Apply Code</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
