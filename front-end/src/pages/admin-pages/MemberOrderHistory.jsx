import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import api from "@/config/axios";

import UpdateMemberOrderHistory from "./UpdateMemberOrderHistoryForm";

export default function MemberOrderHistory() {
  const [customerOrders, setCustomerOrders] = useState([]);
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const { data } = await api.get("order-details");
      console.log(data.result);
      setCustomerOrders(data.result);
    };
    fetchCustomerOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Lịch sử Đơn Hàng</h1>

      {/* Phần lọc */}
      <div className="flex items-center space-x-4 mb-6 p-10">
        <div className="flex space-x-2">
          <button className="text-blue-500 font-medium">Tất cả Đơn Hàng</button>
          <button className="text-yellow-500" value="PENDING">Chờ xử lý</button>
          <button className="text-green-500" value="PAID">Thanh toán thành công</button>
          <button className="text-red-500" value="CANCELED">Đã hủy</button>
          <button className="text-purple-500" value="RECEIVED">Đã nhận</button>
          <button className="text-orange-500" value="SHIPPED">Đã giao</button>
          <button className="text-amber-900" value="PAYMENT_FAILED">Thanh toán thất bại</button>

        </div>
      </div>

      {/* Tìm kiếm và lọc theo ngày */}
      <div className="flex items-center space-x-4 mb-6 p-5">
        <Input placeholder="Tìm kiếm..." className="w-full max-w-xs" />
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Từ</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Đến</span>
          </Button>
        </div>
        <Button variant="outline" className="flex items-center space-x-1">
          <span>Sắp xếp theo</span>
          <span className="w-5 h-5">🔽</span>
        </Button>
      </div>

      {/* Bảng đơn hàng */}
      <div className="mt-10">
      <Table className="w-full">
        <TableCaption className="text-gray-500">Danh sách đơn hàng gần đây của bạn.</TableCaption>
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
          {Array.isArray(customerOrders) && customerOrders.length > 0 ? (
            customerOrders.map((customerOrder,index) => (
              <TableRow key={customerOrder.id} className="hover:bg-gray-50">
                <TableCell className="p-3 text-blue-500">{index+1}</TableCell>
                <TableCell className="p-3">{customerOrder.username}</TableCell>
                <TableCell className="p-3">{new Date(customerOrder.orderDate).toLocaleString()}</TableCell>
                <TableCell className="p-3 text-yellow-500">{customerOrder.originalTotal}</TableCell>
                <TableCell className="p-3 text-green-500">{customerOrder.finalTotal}</TableCell>
                <TableCell>
                {customerOrder.orderStatus }
                </TableCell>
                <TableCell className="p-3 text-blue-500 cursor-pointer">
                <UpdateMemberOrderHistory orderId={customerOrder.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="p-3 text-center text-gray-500">
                Không có đơn hàng nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}

// export function MemberOrderHistory() {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const options = ["Mới nhất", "Cũ nhất"];

//   // Tạo state riêng cho ngày bắt đầu và ngày kết thúc
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleSelection = (value) => {
//     setSelectedOption(value);

//     // Mở dialog nếu chọn 'edit'
//     if (value === "edit") {
//       setIsDialogOpen(true);
//     }
//   };

//   return (
//     <div>
//       <OrderHistory />
//       {/* Các thành phần khác nếu cần */}
//     </div>
//   );
// }


