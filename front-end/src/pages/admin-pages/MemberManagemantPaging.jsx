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
import UpdateMemberForm from "./UpdateMemberForm";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";  

const MemberManagemantPaging = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUserName] = useState("");
  const [roleName, setRoleName] = useState("");  // Thay đổi tên thành roleName
  const [isActive, setIsActive] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const fetchUserData = useCallback(async () => {
    try {
      const params = {
        username,
        roleName: roleName || undefined,  // Cập nhật tham số roleName
        isActive: isActive || undefined,
        sortOrder,
        page,
        size,
      };

      const response = await api.get("users/list-user", { params });
      setUserData(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [
    username,
    roleName,  // Thay đổi từ roleId thành roleName
    isActive,
    sortOrder,
    page,
    size,
  ]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, username, roleName, isActive, sortOrder, page, size]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1);
    fetchUserData();  // Chắc chắn gọi lại đúng hàm
  };

  if (!userData) {
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
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Quản Lý Tài Khoản </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-4">
        <Input
          placeholder="Tìm kiếm theo username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        
        <Select value={roleName} onValueChange={setRoleName}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MANAGER">Quản Lý</SelectItem>
            <SelectItem value="MEMBER">Thành Viên</SelectItem>
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
            <SelectItem value="date_asc">Ngày Tạo: Cũ → Mới</SelectItem>
            <SelectItem value="date">Ngày Tạo: Mới → Cũ</SelectItem>
            <SelectItem value="updesc">Ngày Cập Nhật: Cao → Thấp</SelectItem>
            <SelectItem value="upasc">Ngày Cập Nhật: Thấp → Cao</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <Button onClick={handleSearch} className="w-full md:w-auto">
          Tìm Kiếm
        </Button>
      </div>

      {/* Danh sách người dùng */}
      <div className="mt-10">
        <Table className="w-full">
          <TableCaption className="text-gray-500">Danh sách người dùng</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableCell className="p-3 font-semibold">Chỉnh sửa</TableCell>
              <TableCell className="p-3 font-semibold">UserName</TableCell>
              <TableCell className="p-3 font-semibold">Số điện thoại</TableCell>
              <TableCell className="p-3 font-semibold">Email</TableCell>
              <TableCell className="p-3 font-semibold">Vai trò</TableCell>
              <TableCell className="p-3 font-semibold">Trạng thái</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.data.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="p-3 text-yellow-500 cursor-pointer">
                  <UpdateMemberForm userId={user.id} />
                </TableCell>
                <TableCell className="p-3">{user.username}</TableCell>
                <TableCell className="p-3">{user.phone}</TableCell>
                <TableCell className="p-3">{user.email}</TableCell>
                <TableCell className="p-3">{user.roleName}</TableCell>
                <TableCell className="p-3">
                  {user.active ? (
                    <span className="text-green-500">Hoạt động</span>
                  ) : (
                    <span className="text-red-500">Tắt</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Hiện trang {userData.currentPage} trên {userData.totalPages} (Tổng cộng số tài khoản: {userData.totalElements})
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(userData.currentPage - 1)}
            disabled={userData.currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: userData.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                variant={userData.currentPage === pageNum ? "default" : "outline"}
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
            onClick={() => handlePageChange(userData.currentPage + 1)}
            disabled={userData.currentPage === userData.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberManagemantPaging;
