import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import api from "@/config/axios";
import { Card } from "@/components/ui/card"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
// import { Link, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { formatterToVND } from "@/utils/formatter";


export default function MemberOrderHistoryDetail () {
  const { orderId, userId } = useParams(); // Get both orderId and userId from the URL
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("orderId:", orderId, "userId:", userId);  // Debugging line
    const fetchOrderDetail = async () => {
      try {
        const response = await api.get(`/order-details/order/${orderId}/user/${userId}`);
        setOrderDetail(response.data.result);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải chi tiết đơn hàng.");
        setLoading(false);
      }
    };
  
    if (orderId && userId) {
      fetchOrderDetail();
    } else {
      setError("Missing orderId or userId.");
      setLoading(false);
    }
  }, [orderId, userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-6  bg-white ">
    {/* Header Section */}
    <div className="flex items-center justify-between">
      <Button variant="ghost" className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        <Link to={"/admin/member-order-history"}>Back</Link>
      </Button>
      <h1 className="text-lg font-medium">Chi tiết đơn hàng</h1>
      <div className="w-24" /> {/* Spacer for alignment */}
    </div>
    
  {/* Order Information */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input value={orderDetail.customerName || ""} readOnly placeholder="Tên khách hàng" />
        <Input value={orderDetail.email || ""} readOnly placeholder="Email" />
        <Input value={orderDetail.phone || ""} readOnly placeholder="Số điện thoại" />
        <Input value={orderDetail.shippingAddress || ""} readOnly placeholder="Địa chỉ giao hàng" />
        <Input value={orderDetail.bankCode || ""} readOnly placeholder="Mã ngân hàng" />
        <Input value={orderDetail.cardType || ""} readOnly placeholder="Loại thẻ" />
        <Input value={orderDetail.code || ""} readOnly placeholder="Mã giảm giá" />
        <Input value={orderDetail.cartItems.length || ""} readOnly placeholder="Tổng số lượng sản phẩm" />
      </div>

      {/* Product Details */}
      <div className="space-y-4">
        {orderDetail.cartItems.map((item) => (
          <Card key={item.variantId} className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                <img src={item.url} alt="Product" className="object-cover rounded-lg" />
              </div>
              <div className="flex-1 space-y-4">
                <Input value={item.productName || ""}readOnly placeholder="Tên sản phẩm" />
                <Input value={formatterToVND.format(item.price) || ""} readOnly placeholder="Giá 1 sản phẩm" />
                <div className="grid grid-cols-2 gap-4">
                  {/* <Input value={product.size || ""} readOnly placeholder="Size" /> */}
                  <Input value={item.quantity || ""} readOnly placeholder="Số lượng" />
                  <Input value={formatterToVND.format(item.price * item.quantity) || ""} readOnly placeholder="Tống giá" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

    {/* Pagination
    <div className="flex justify-center gap-1">
      <Button variant="outline" size="icon">
        <ChevronFirst className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="px-4">
        1/10
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronLast className="h-4 w-4" />
      </Button>
    </div> */}
  </div>
  );
}
