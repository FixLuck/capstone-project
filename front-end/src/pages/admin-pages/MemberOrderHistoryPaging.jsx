import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; // We'll use axios for HTTP requests
import api from "@/config/axios";
// You'll need to install and import your UI components library
// For this example, I'll assume we're using a hypothetical 'react-ui-library'
// import { Input, Button, Select, Table } from 'react-ui-library'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, TableCellsMerge } from "lucide-react";
import { formatterToVND } from "@/utils/formatter";
import UpdateMemberOrderHistory from "./UpdateMemberOrderHistoryForm";
// import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import MemberOrderHistoryDetail from "./MemberOrderHistoryDetail";
import { Pagination } from "@/components/ui/pagination";

const MemberOrderHistoryPaging   = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  const [orderStatus, setOrderStatus] = useState("");
  const handleStatusChange = (status) => {
    setOrderStatus(status); // Cập nhật trạng thái
  };
  const [sortOrder, setSortOrder] = useState("date");
  const [page, setPage] = useState(1);

  const [size, setSize] = useState(5);

  const statusCounts = orderData?.additionalData?.statusCounts || {
    ALL: 0,
    PENDING: 0,
    PAID: 0,
    CANCELED: 0,
    RECEIVED: 0,
    SHIPPED: 0,
    PAYMENT_FAILED: 0,
  };
  const calculateTotalOrders = () => {
    if (orderData && orderData.additionalData && orderData.additionalData.statusCounts) {
      return Object.values(orderData.additionalData.statusCounts).reduce((total, count) => total + count, 0);
    }
    return 0;
  };

  const fetchOrderData = useCallback(async () => {
    try {
      const params = {
        orderStatus: orderStatus || undefined,
        sortOrder,
        page,
        size,
      };

      const response = await api.get("order-details/list-order", { params });
      const result = response.data.result;
    const additionalData = response.data.additionalData;
    console.log(orderData?.additionalData?.statusCounts);

    setOrderData({
      ...result,
      additionalData, // Gộp thêm additionalData
    });
      // setOrderData(response.data.result);
      // console.log("Response data:", response.data);
      // console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }, [
    orderStatus,
    sortOrder,
    page,
    size,
  ]);

  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1);
    fetchOrderData();
  };

  if (!orderData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }
  const totalOrders = calculateTotalOrders();

  return (

    <div className="p-6 max-w-full h-screen mx-auto bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4 text-center">Lịch Sử Đơn Hàng</h1>

    <div className="flex items-center space-x-4 mb-6 p-10">
      <div className="flex space-x-2">
      <button
        onClick={() => handleStatusChange("")}
        className={`font-medium ${orderStatus === "" ? "text-blue-700" : "text-blue-500"}`}
      >
        Tất cả Đơn Hàng ({totalOrders || 0})
      </button>
      <button
        onClick={() => handleStatusChange("PENDING")}
        className={`font-medium ${orderStatus === "PENDING" ? "text-yellow-700" : "text-yellow-500"}`}
      >
        Chờ xử lý ({orderData?.additionalData?.statusCounts?.PENDING || 0})
      </button>
      <button
        onClick={() => handleStatusChange("PAID")}
        className={`font-medium ${orderStatus === "PAID" ? "text-green-700" : "text-green-500"}`}
      >
        Thanh toán thành công ({orderData?.additionalData?.statusCounts?.PAID || 0})
      </button>
      <button
        onClick={() => handleStatusChange("CANCELED")}
        className={`font-medium ${orderStatus === "CANCELED" ? "text-red-700" : "text-red-500"}`}
      >
        Đã hủy ({orderData?.additionalData?.statusCounts?.CANCELED || 0})
      </button>
      <button
        onClick={() => handleStatusChange("RECEIVED")}
        className={`font-medium ${orderStatus === "RECEIVED" ? "text-purple-700" : "text-purple-500"}`}
      >
        Đã nhận ({statusCounts.RECEIVED || 0})
      </button>
      <button
        onClick={() => handleStatusChange("SHIPPED")}
        className={`font-medium ${orderStatus === "SHIPPED" ? "text-orange-700" : "text-orange-500"}`}
      >
        Đã giao ({orderData?.additionalData?.statusCounts?.SHIPPED || 0})
      </button>
      <button
        onClick={() => handleStatusChange("PAYMENT_FAILED")}
        className={`font-medium ${orderStatus === "PAYMENT_FAILED" ? "text-amber-700" : "text-amber-900"}`}
      >
        Thanh toán thất bại ({orderData?.additionalData?.statusCounts?.PAYMENT_FAILED || 0})
      </button>
    </div>


    <div className="flex items-center space-x-2" >
        <Select value={sortOrder} onValueChange={setSortOrder} className="flex items-center space-x-2">
          <SelectTrigger>
            <SelectValue placeholder="chọn mục để sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Ngày đặt: Mới Tới Cũ</SelectItem>
            <SelectItem value="date_asc">Ngày đặt: Cũ Tới Mới</SelectItem>
            <SelectItem value="desc">Giá tổng cuối cùng: Cao tới thấp</SelectItem>
            <SelectItem value="asc">Giá tổng cuối cùng: thấp tới Cao</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>




      <div className="mt-10">
        <Table className="w-full">
          <TableHeader className="bg-gray-100">
            <TableRow>
            <TableCell className="p-3 font-semibold">Mã Đơn</TableCell>
            <TableCell className="p-3 font-semibold">Tên Người Dùng</TableCell>
            <TableCell className="p-3 font-semibold">Ngày Mua</TableCell>
            <TableCell className="p-3 font-semibold">Giá Tổng Ban Đầu</TableCell>
            <TableCell className="p-3 font-semibold">Giá Tổng Cuối Cùng</TableCell>
            <TableCell className="p-3 font-semibold">Trang Thái</TableCell>
            <TableCell className="p-3 font-semibold">Chỉnh Sửa</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.data.map((customerOrder) => (
              <TableRow key={customerOrder.id} className="hover:bg-gray-50">

                <TableCell className="p-3 text-blue-500">{customerOrder.id.slice(0, 8)}</TableCell>
                <TableCell className="p-3">{customerOrder.username}</TableCell>
                <TableCell className="p-3">{new Date(customerOrder.orderDate).toLocaleString()}</TableCell>
                <TableCell className="p-3 text-yellow-500">{formatterToVND.format(customerOrder.originalTotal)}</TableCell>
                <TableCell className="p-3 text-green-500">{formatterToVND.format(customerOrder.finalTotal)}</TableCell>
                <TableCell>
                {customerOrder.orderStatus }
                </TableCell>
                <TableCell className="p-3 text-blue-500 cursor-pointer">
                <UpdateMemberOrderHistory orderId={customerOrder.id} />
                <Button
                  variant="ghost"
                  onClick={() =>
                    navigate(`/admin/member-order-history/detail/${customerOrder.id}/${customerOrder.userId}`)
                  }
                >
                  Xem chi tiết
                </Button>


                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Hiện trang {orderData.currentPage} trên {orderData.totalPages}
           {/* (tổng số đơn hàng: {orderData.totalElements}) */}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(orderData.currentPage - 1)}
            disabled={orderData.currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: orderData.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                variant={
                    orderData.currentPage === pageNum ? "default" : "outline"
                }
                size="sm"
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(orderData.currentPage + 1)}
            disabled={orderData.currentPage === orderData.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberOrderHistoryPaging;