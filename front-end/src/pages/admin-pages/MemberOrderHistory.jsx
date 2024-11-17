import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminAside from "@/components/admin-com/AdminAside";
import { ComboboxSortDiscount } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function OrderHistory() {
  const orders = [
    {
      id: '#12526',
      username: 'user1',
      productName: 'Giày thể thao',
      payment: 'Đã thanh toán',
      status: 'Chờ xử lý',
      total: '$20',
    },
    {
      id: '#52689',
      username: 'user2',
      productName: 'Đồng hồ',
      payment: 'COD',
      status: 'Đã hủy',
      total: '$20',
    },
    {
      id: '#52648',
      username: 'user3',
      productName: 'Tai nghe',
      payment: 'COD',
      status: 'Đã hủy',
      total: '$20',
    },
    {
      id: '#23845',
      username: 'user4',
      productName: 'Nước hoa COCO',
      payment: 'Đã thanh toán',
      status: 'Đã nhận',
      total: '$20',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Lịch sử Đơn Hàng</h1>

      {/* Phần lọc */}
      <div className="flex items-center space-x-4 mb-6 p-10">
        <div className="flex space-x-2">
          <button className="text-blue-500 font-medium">Tất cả Đơn Hàng(50)</button>
          <button className="text-gray-500">Chờ xử lý(10)</button>
          <button className="text-gray-500">Hoàn thành(8)</button>
          <button className="text-gray-500">Đã hủy(22)</button>
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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Mã Đơn</th>
              <th className="py-3 px-4 text-left">Tên Người Dùng</th>
              <th className="py-3 px-4 text-left">Tên Sản Phẩm</th>
              <th className="py-3 px-4 text-left">Thanh Toán</th>
              <th className="py-3 px-4 text-left">Trạng Thái</th>
              <th className="py-3 px-4 text-left">Tổng Tiền</th>
              <th className="py-3 px-4 text-left">Hóa Đơn</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-3 px-4 text-blue-500">{order.id}</td>
                <td className="py-3 px-4">{order.username}</td>
                <td className="py-3 px-4">{order.productName}</td>
                <td className="py-3 px-4 text-green-500">{order.payment}</td>
                <td
                  className={`py-3 px-4 ${
                    order.status === 'Chờ xử lý'
                      ? 'text-yellow-500'
                      : order.status === 'Đã nhận'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-3 px-4">{order.total}</td>
                <td className="py-3 px-4 text-blue-500">🖶</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MemberOrderHistory() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const options = ["Mới nhất", "Cũ nhất"];

  // Tạo state riêng cho ngày bắt đầu và ngày kết thúc
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelection = (value) => {
    setSelectedOption(value);

    // Mở dialog nếu chọn 'edit'
    if (value === "edit") {
      setIsDialogOpen(true);
    }
  };

  return (
    <div>
      <OrderHistory />
      {/* Các thành phần khác nếu cần */}
    </div>
  );
}

export default MemberOrderHistory;
