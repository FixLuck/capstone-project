import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/config/axios";
import UpdateDiscountForm from "./UpdateDiscountForm";  
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function AddDiscountPage() {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    percentage: 0,
    startDate: '',
    endDate: '',
    code: '',
    minimumOrderAmount: 0,
    description: '',
    fixedAmount: 0,
    discountType: 'PERCENTAGE',
    isActive: true
  });

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/discounts');
      if (Array.isArray(response.data.result)) {
        setDiscounts(response.data.result);
      } else {
        console.error('Dữ liệu trả về không phải là mảng trong thuộc tính result:', response.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy mã giảm giá:', error);
    }
  };

  // Hàm thêm mã giảm giá mới
  // const handleAddDiscount = async () => {
  //   try {
  //     const discountToAdd = {
  //       ...newDiscount,
  //       startDate: new Date(newDiscount.startDate).toISOString(),
  //       endDate: new Date(newDiscount.endDate).toISOString(),
  //     };
  //     const response = await axios.post('http://localhost:8080/api/v1/discounts', discountToAdd);
  //     setDiscounts(prevDiscounts => [...prevDiscounts, response.data]);
  //     resetForm();
  //   } catch (error) {
  //     console.error("Lỗi khi thêm mã giảm giá:", error);
  //   }
  // };

  // Hàm reset form
  // const resetForm = () => {
  //   setNewDiscount({
  //     percentage: 0,
  //     startDate: '',
  //     endDate: '',
  //     code: '',
  //     minimumOrderAmount: 0,
  //     description: '',
  //     fixedAmount: 0,
  //     discountType: 'PERCENTAGE',
  //     isActive: true
  //   });
  // };

  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg shadow-md">

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Discount Management</h1>
      <Button variant="outline" className="hover:bg-green-600 hover:text-white">
        <Link to={"/admin/discount-management/new"} className="flex p-4 align-items-center">
          <IoIosAddCircleOutline className="mr-2 h-10 w-10" />
          <span>Add</span>
        </Link>
      </Button>
      






      {/* Danh sách mã giảm giá */}
      <div className="mt-10">
        <Table className="w-full">
          <TableCaption className="text-gray-500">Danh sách mã giảm giá của bạn.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableCell className="p-3 font-semibold">Chỉnh sửa</TableCell>
              <TableCell className="p-3 font-semibold">Mã giảm giá</TableCell>
              <TableCell className="p-3 font-semibold">Phần trăm</TableCell>
              <TableCell className="p-3 font-semibold">Ngày bắt đầu</TableCell>
              <TableCell className="p-3 font-semibold">Ngày kết thúc</TableCell>
              <TableCell className="p-3 font-semibold">Hoạt động</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(discounts) && discounts.length > 0 ? (
              discounts.map(discount => (
                <TableRow key={discount.id} className="hover:bg-gray-50">

                  <TableCell className="p-3 text-yellow-500 cursor-pointer">
                    {/* <button onClick={() => handleDeleteDiscount(discount.id)}>Delete</button> */}
                    {/* Delete */}
                    <UpdateDiscountForm discountId={discount.id} />
                 <TableCell className="p-3 text-red-500 cursor-pointer">
                    {/* <button onClick={() => handleDeleteDiscount(discount.id)}>Xóa</button> */}

                  </TableCell>
                  <TableCell className="p-3">{discount.code}</TableCell>
                  <TableCell className="p-3">{discount.discountType}</TableCell>
                  <TableCell className="p-3">{new Date(discount.startDate).toLocaleString()}</TableCell>
                  <TableCell className="p-3">{new Date(discount.endDate).toLocaleString()}</TableCell>
                  <TableCell className="p-3">
                    {discount.active ? (
                      <span className="text-green-500" value="true">Active</span>
                    ) : (
                      <span className="text-red-500"value="false">Inactive</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="p-3 text-center text-gray-500">
                  Không có mã giảm giá
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


