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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [selectedOption, setSelectedOption] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const options = ["mới nhất", "cũ nhất"];
  
  // Trạng thái riêng cho ngày bắt đầu và ngày kết thúc
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelection = (value) => {
    setSelectedOption(value);

    // Mở hộp thoại nếu 'chỉnh sửa' được chọn
    if (value === "chỉnh sửa") {
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="mt-5 mb-5 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
            <div className="sm:col-span-4 mt-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#">2</PaginationLink>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="sm:col-span-8">
              <div className="grid gap-4 sm:grid-cols-8 grid-cols-1">
                <div className="sm:col-span-6">
                  <div className="relative mt-1">
                    <div className="grid gap-4 sm:grid-cols-6 grid-cols-1">
                    <div className="sm:col-span-3">
                <Popover id="disStart" className="mb-2">
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Chọn ngày bắt đầu</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
                    </div>
                    <div className="sm:col-span-3">
                    <Popover id="disEnd" className="mb-2">
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Chọn ngày kết thúc</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
                    </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Button className="bg-green-500 text-indigo-50" variant="default">
                    Lưu sang Excel
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 p-10" >
            <Table>
              <TableCaption>Danh sách các đơn hàng gần đây của bạn.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Ngày đặt hàng</TableHead>
                  <TableHead>Phần trăm giảm giá</TableHead>
                  <TableHead>Tổng số tiền</TableHead>
                  <TableHead>Tổng chi phí</TableHead>
                  <TableHead>Trạng thái đơn hàng</TableHead>
                  <TableHead>Chi tiết</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>30/10/2024</TableCell>
                  <TableCell>5%</TableCell>
                  <TableCell>300$</TableCell>
                  <TableCell>285$</TableCell>
                  <TableCell>Hoàn thành</TableCell>
                  <TableCell><a href="#" className="text-indigo-500">Chi tiết</a></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
    </div>
  );
}

export default OrderHistory;