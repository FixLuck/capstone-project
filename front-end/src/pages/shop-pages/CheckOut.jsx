import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminAside from '../../components/admin-com/AdminAside.jsx';

function CheckOut() {
  return (
    <div >

          <div className="mt-5 mb-5 bg-white p-5">
          <h1 className="mt-5 text-lg text-black-500 font-bold" align="center">
            Check Out
          </h1>
          <div className="mt-2">
            <div class="flex">
              <div class="flex-1 p-2">
                <div class="w-full px-4">
                  <Card className="w-full p-4 bg-transparent mb-2">
                    <CardHeader>
                      <CardDescription className="mt-5 text-lg text-black-500 font-bold">Information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid w-full gap-4">
                        <div className="grid gap-2 items-start space-y-2">
                          <Label>Full name</Label>
                          <Input id="name" type="text" />
                        </div>
                        <div className="grid gap-2 items-start space-y-2">
                          <Label>Address</Label>
                          <Input id="address" type="text" />
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                          <Label>Phone</Label>
                          <Input id="phone" type="text" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>    
                    </CardFooter>
                  </Card>
                </div>
                <div class="w-full px-4">
                  <Card className="w-full bg-transparent p-4">
                    <CardHeader>
                      <CardDescription className="mt-5 text-lg text-black-500 font-bold">Payment</CardDescription>
                    </CardHeader>
                    <CardContent class="flex items-center justify-center">
                      <div class="w-full flex flex-col space-y-4">
                          <Button class="bg-black text-white rounded p-2">Cash</Button>
                          <Button class="bg-black text-white rounded p-2">Credit Card</Button>
                          <Button class="bg-black text-white rounded p-2">Wallet</Button>
                      </div>  
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div class="flex-1 p-4">
                <div class="w-full px-4">
                  <Card className="w-full bg-transparent p-4 mb-2">
                      <CardHeader>
                        <CardDescription className="mt-5 text-lg text-black-500 font-bold" align="center">Order Summary</CardDescription>
                      </CardHeader>
                      <CardContent class="flex p-4">
                        <div class="flex items-center space-x-4">
                            <input 
                                type="text" 
                                placeholder="Promo Code" 
                                class="border border-gray-300 rounded p-2 w-40 h-10"
                            />
                            <Button class="bg-green-500 text-white rounded h-10 px-4">Apply</Button>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div class="mb-4">
                          <label class="block text-gray-700 mb-2 font-bold">Subtotal:</label>
                          <label class="block text-gray-700 mb-2 font-bold">Delivery/Shipping:</label>
                          <label class="block text-gray-700 mb-2 font-bold">Discount:</label>
                        </div>
                      </CardFooter>
                  </Card>
                </div>
                <div class="w-full px-4">
                  <Card className="w-full bg-transparent p-4">
                      <CardHeader>
                        <CardDescription className="mt-5 text-lg text-black-500 font-bold">Total</CardDescription>
                      </CardHeader> 
                      <CardContent class="flex">
                        <div class="flex items-center mb-2  ">
                            <div class="border border-black p-2 rounded">
                                <img src="#" alt="Ảnh Sản Phẩm" class="w-40 h-40 object-cover"/>
                            </div>
                            <label class="text-lg text-gray-700 p-2">Product Info</label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button class="w-full bg-black text-white rounded p-2">Pay</Button>
                      </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default CheckOut;