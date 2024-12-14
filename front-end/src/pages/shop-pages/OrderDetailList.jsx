import React from "react";

import { format, set } from "date-fns";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import api from "@/config/axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/store/auth";
import { formatterToVND } from "@/utils/formatter";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useNavigate } from "react-router-dom";

export default function OrderDetailList() {
  const [userData, setUserData] = useState({});
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const userName = user ? user.sub : null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/profile?username=${userName}`);
        setUserData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userName]);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await api.get(`/order-details/user/${userData.id}`);
        console.log(response.data.result);
        setOrderList(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderInfo();
  }, [userData.id]);

  console.log(orderList);
  console.log(userData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Đơn hàng đã đặt</h1>
      <div className="space-y-4">
        {orderList.length > 0 ? (
          orderList.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div>
            <p className="mb-4">Chưa có đơn hàng nào</p>
            <Button onClick={() => navigate("/")}>Shopping now</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusStyle = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Đơn hàng #{order.id.slice(0, 8)}</span>
          <span
            className={`text-sm px-2 py-1 rounded ${getStatusStyle(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </span>
        </CardTitle>
        <CardDescription>
          Đặt hàng vào ngày {format(new Date(order.orderDate), "dd/MM/yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">
            Tổng tiền: {formatterToVND.format(order.finalTotal)} VNĐ
          </span>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline">
                {isOpen ? (
                  <>
                    Ẩn chi tiết
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Xem chi tiết
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <ul className="space-y-2">
                {order.cartItems.map((item) => (
                  <li
                    key={item.variantId}
                    className="flex justify-between items-center"
                  >
                    <span className="me-2">
                      {item.productName}x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatterToVND.format(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="mr-2 h-4 w-4" />
          <span>
            {order.cartItems.length}{" "}
            {order.cartItems.length === 1 ? "sản phẩm" : "sản phẩm"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
