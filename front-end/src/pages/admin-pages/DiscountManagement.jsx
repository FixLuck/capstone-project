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
import api from "@/config/axios";

export function DiscountManagement() {

  const [selectedOption, setSelectedOption] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const options = ["mới nhất", "cũ nhất"];
  
  // Tách riêng trạng thái cho ngày bắt đầu và ngày kết thúc
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelection = (value) => {
    setSelectedOption(value);

    // Mở hộp thoại khi chọn 'edit'
    if (value === "edit") {
      setIsDialogOpen(true);
    }
  };

  const [discounts, setDiscounts] = React.useState([]);
  
  useEffect(() => {
    const fetchDiscounts = async () => {
      const { data } = await api.get("discounts");
      setDiscounts(data.result);
    };

    fetchDiscounts();
  }, []);

  return (
    <div>
      <h1 className="mt-5 text-4xl font-bold" align="center">
        Quản lý mã giảm giá
      </h1>

      <div className="mt-5">
        <div className="grid gap-4 sm:grid-cols-10 grid-cols-1">
          <div className="sm:col-span-5 mt-3">
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

          <div className="sm:col-span-5">
            <div className="grid gap-4 sm:grid-cols-5 grid-cols-1">
              <div className="sm:col-span-2">
                <div className="relative mt-1">
                  <ComboboxSortDiscount
                    as="div"
                    value={selectedOption}
                    onChange={handleSelection}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Button className="bg-green-500 text-indigo-50" variant="default">
                  Lưu vào Excel
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Table>
            <TableCaption>Danh sách mã giảm giá gần đây của bạn.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Chỉnh sửa</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Mã giảm giá</TableHead>
                <TableHead>Loại giảm giá</TableHead>
                <TableHead>Ngày bắt đầu</TableHead>
                <TableHead>Ngày kết thúc</TableHead>
                <TableHead>Hoạt động</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
            {discounts.map((discount, index) => (
              <TableRow key={discount.id}>
                <TableCell>
                  <Select onValueChange={handleSelection}>
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder="Chỉnh sửa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Hành động</SelectLabel>
                        <SelectItem value="edit" className="text-yellow-500">Chỉnh sửa</SelectItem>
                        <SelectItem value="delete" className="text-red-500">Xóa</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{discount.code}</TableCell>
                <TableCell>{discount.discountType}</TableCell>
                <TableCell>{discount.startDate}</TableCell>
                <TableCell>{discount.endDate}</TableCell>
                <TableCell>{discount.isActive ? "Có" : "Không"}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Hộp thoại chỉnh sửa mã giảm giá */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button style={{ display: 'none' }}>Mở hộp thoại</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle align="center">Chỉnh sửa mã giảm giá</DialogTitle>
          </DialogHeader>
          <form>
            <Label htmlFor="disId">Mã giảm giá</Label>
            <Input id="disId" type="text" className="mb-2" />
            <Label htmlFor="disPer">Phần trăm</Label>
            <Input id="disPer" type="number" className="mb-2" />

            <Label htmlFor="disStart">Ngày bắt đầu</Label>
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

            <Label htmlFor="disEnd">Ngày kết thúc</Label>
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

            <div className="mt-5 gap-4 sm:flex">
              <Button className="bg-gray-500 text-indigo-50">Quay lại</Button>
              <Button className="bg-green-500 text-indigo-50">Lưu</Button>
              <Button className="bg-red-500 text-indigo-50">Hủy</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DiscountManagement;
