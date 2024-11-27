import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/config/axios";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatterToVND } from "@/utils/formatter";

export default function MemberOrderHistoryDetail() {
  const { orderId, userId } = useParams(); // Get both orderId and userId from the URL
  const [orderDetail, setOrderDetail] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    const fetchUserDetail = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserDetail(response.data.result);
      } catch (err) {
        setError("Không thể tải thông tin khách hàng.");
      }
    };

    if (orderId && userId) {
      fetchOrderDetail();
      fetchUserDetail();
    } else {
      setError("Missing orderId or userId.");
      setLoading(false);
    }
  }, [orderId, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gray-50 rounded-md shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Link to={"/admin/member-order-history"}>Back</Link>
        </Button>
        <h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
        <div className="w-24" /> {/* Spacer for alignment */}
      </div>

      {/* Order Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">Thông tin khách hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-sm">
          <div>
            <Label className="text-sm font-medium text-gray-600">Tên khách hàng</Label>
            <p className="text-gray-800">{userDetail?.fullName || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Email</Label>
            <p className="text-gray-800">{userDetail?.email || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Số điện thoại</Label>
            <p className="text-gray-800">{userDetail?.phone || "N/A"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Địa chỉ giao hàng</Label>
            <p className="text-gray-800">{userDetail?.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">Chi tiết sản phẩm</h2>
        {orderDetail.cartItems.map((item) => (
          <Card key={item.variantId} className="p-4 bg-white rounded-md shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tên sản phẩm</Label>
                  <p className="text-gray-800">{item.productName || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Giá 1 sản phẩm</Label>
                  <p className="text-gray-800">{formatterToVND.format(item.price) || "N/A"}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Số lượng</Label>
                    <p className="text-gray-800">{item.quantity || 0}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tổng giá</Label>
                    <p className="text-gray-800">
                      {formatterToVND.format(item.price * item.quantity) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
