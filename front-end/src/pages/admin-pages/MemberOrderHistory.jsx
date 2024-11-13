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
      productName: 'Sport Shoes',
      payment: 'Paid',
      status: 'Pending',
      total: '$20',
    },
    {
      id: '#52689',
      username: 'user2',
      productName: 'Watch',
      payment: 'COD',
      status: 'Cancelled',
      total: '$20',
    },
    {
      id: '#52648',
      username: 'user3',
      productName: 'Headphone',
      payment: 'COD',
      status: 'Cancelled',
      total: '$20',
    },
    {
      id: '#23845',
      username: 'user4',
      productName: 'COCO Perfume',
      payment: 'Paid',
      status: 'Received',
      total: '$20',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Order History</h1>

      {/* Filter Section */}
      <div className="flex items-center space-x-4 mb-6 p-10">
        <div className="flex space-x-2">
          <button className="text-blue-500 font-medium">All Order(50)</button>
          <button className="text-gray-500">Pending(10)</button>
          <button className="text-gray-500">Completed(8)</button>
          <button className="text-gray-500">Cancelled(22)</button>
        </div>
      </div>

      {/* Search and Date Filter */}
      <div className="flex items-center space-x-4 mb-6 p-5">
        <Input placeholder="Search..." className="w-full max-w-xs" />
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>From</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>To</span>
          </Button>
        </div>
        <Button variant="outline" className="flex items-center space-x-1">
          <span>Sort By</span>
          <span className="w-5 h-5">🔽</span>
        </Button>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden ">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Id</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Payment</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Invoice</th>
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
                    order.status === 'Pending'
                      ? 'text-yellow-500'
                      : order.status === 'Received'
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
  const options = ["newest", "oldest"];

  // Separate state for start date and end date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelection = (value) => {
    setSelectedOption(value);

    // Open the dialog if 'edit' is selected
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
