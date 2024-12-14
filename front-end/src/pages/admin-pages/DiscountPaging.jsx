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
import { ChevronLeft, ChevronRight, TableCellsMerge } from "lucide-react";
import { formatterToVND } from "@/utils/formatter";
import UpdateDiscountForm from "../admin-pages/UpdateDiscountForm";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";  


const DiscountPaging = () => {
  const [discountData, setDiscountData] = useState(null);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [isActive, setIsActive] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const fetchDiscountData = useCallback(async () => {
    try {
      const params = {
        code,
        discountType: discountType || undefined,
        isActive: isActive || undefined,
        sortOrder,
        page,
        size,
      };

      const response = await api.get("discounts/list-discount", { params });
      setDiscountData(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching discount data:", error);
    }
  }, [
    code,
    discountType,
    isActive,
    sortOrder,
    page,
    size,
  ]);

  useEffect(() => {
    fetchDiscountData();
  }, [fetchDiscountData, code, discountType, isActive, sortOrder, page, size]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1);
    fetchDiscountData();
  };

  if (!discountData) {
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

  return (
    <div className="p-6 max-w-full h-screen mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Quản Lý Mã Giảm Giá</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Input
          placeholder="Tìm kiếm theo mã giảm giá"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        
        <Select value={discountType} onValueChange={setDiscountType}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn Loại Giảm Giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PERCENTAGE">Phần trăm </SelectItem>
            <SelectItem value="FIXED_AMOUNT">Số tiền cố định</SelectItem>
          </SelectContent>
        </Select>
        <Select value={isActive} onValueChange={setIsActive}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn Trạng Thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Hoạt Động</SelectItem>
            <SelectItem value="false">Tắt</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Ngày Hết Hạn: Gần → Xa</SelectItem>
            <SelectItem value="date_desc">Ngày Hết Hạn: Xa → Gần</SelectItem>
            <SelectItem value="pcdesc">Phần trăm: Cao → Thấp</SelectItem>
            <SelectItem value="pcasc">Phần trăm: Thấp → Cao</SelectItem>
            <SelectItem value="fadesc">Số tiền cố định: Cao → Thấp</SelectItem>
            <SelectItem value="faasc">Số tiền cố định: Thấp → Cao</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
      <Button onClick={handleSearch} className="w-full md:w-auto">
        Tìm kiếm
      </Button>
      <Button variant="outline" className="hover:bg-green-600 hover:text-white ms-3">
        <Link to={"/admin/discount-management/new"} className="flex p-4 align-items-center">
          <IoIosAddCircleOutline className="mr-2 h-10 w-10" />
          <span>Thêm</span>
        </Link>
      </Button>
      </div>
      {/* Danh sách mã giảm giá */}
      <div className="mt-10">
        <Table className="w-full">
          <TableCaption className="text-gray-500">Danh sách mã giảm giá gần đây.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableCell className="p-3 font-semibold">Chỉnh sửa</TableCell>
              <TableCell className="p-3 font-semibold">Tên mã</TableCell>
              <TableCell className="p-3 font-semibold">Loại giảm giá</TableCell>
              <TableCell className="p-3 font-semibold">Ngày bắt đầu</TableCell>
              <TableCell className="p-3 font-semibold">Ngày kết thúc</TableCell>
              <TableCell className="p-3 font-semibold">Trạng thái</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
          {discountData.data.map((discount) => (
             
                <TableRow key={discount.id} className="hover:bg-gray-50">
                  <TableCell className="p-3 text-yellow-500 cursor-pointer">
                    {/* <button onClick={() => handleDeleteDiscount(discount.id)}>Delete</button> */}
                    {/* Delete */}
                    <UpdateDiscountForm discountId={discount.id} />
                  </TableCell>
                  <TableCell className="p-3">{discount.code}</TableCell>
                  <TableCell className="p-3">{discount.discountType}</TableCell>
                  <TableCell className="p-3">{new Date(discount.startDate).toLocaleString()}</TableCell>
                  <TableCell className="p-3">{new Date(discount.endDate).toLocaleString()}</TableCell>
                  <TableCell className="p-3">
                    {discount.active ? (
                      <span className="text-green-500" value="true">Hoạt động </span>
                    ) : (
                      <span className="text-red-500"value="false">Tắt</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Hiện trang {discountData.currentPage} trên {discountData.totalPages} (Tổng cộng
          số mã giảm: {discountData.totalElements})
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(discountData.currentPage - 1)}
            disabled={discountData.currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: discountData.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                variant={
                    discountData.currentPage === pageNum ? "default" : "outline"
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
            onClick={() => handlePageChange(discountData.currentPage + 1)}
            disabled={discountData.currentPage === discountData.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscountPaging;
