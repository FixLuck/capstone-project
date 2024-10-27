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

function Notifacation() {
    return (
    <div className="w-[600px] h-[600px] p-6 bg-white rounded-lg shadow-md">
        <div className="w-full h-full p-4">
            <Card className="w-full h-4/5 border-0">
            <CardHeader>
                <CardDescription className="font-bold text-center">Bạn có thông báo quan trọng!!!</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center h-4/5">
                <img src="https://short.com.vn/W4Ty" alt="Thông báo quan trọng" className="w-1/3 h-auto mr-2" />
                <div className="grid w-full gap-6 p-4 mb-4">
                    <div id="notice" className="grid gap-2 font-bold">
                        Sản phẩm của bạn đã được thêm vào giỏ hàng. Nếu bạn muốn mua sản phẩm đó thì hãy nhấp vào giỏ hàng và chọn đặt mua. Xin cảm ơn!
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end p-4">
                <Button className="w-[100px] h-[60px] px-4 rounded-lg border text-white border-gray-500 hover:bg-gray-500">
                    Okay
                </Button>
            </CardFooter>
            </Card>
        </div>
    </div>
      
    );
}
export default Notifacation;