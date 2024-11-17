import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

function AddDiscountPage() {
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
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Quản lý mã giảm giá</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          type="text"
          placeholder="Mã giảm giá"
          value={newDiscount.code}
          onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Phần trăm"
          value={newDiscount.percentage}
          onChange={(e) => setNewDiscount({ ...newDiscount, percentage: parseFloat(e.target.value) })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="datetime-local"
          placeholder="Ngày bắt đầu"
          value={newDiscount.startDate}
          onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="datetime-local"
          placeholder="Ngày kết thúc"
          value={newDiscount.endDate}
          onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Số tiền đơn hàng tối thiểu"
          value={newDiscount.minimumOrderAmount}
          onChange={(e) => setNewDiscount({ ...newDiscount, minimumOrderAmount: parseFloat(e.target.value) })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <textarea
          placeholder="Mô tả"
          value={newDiscount.description}
          onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 col-span-full"
          style={{ height: '3rem' }}
        />
        <input
          type="number"
          placeholder="Số tiền cố định"
          value={newDiscount.fixedAmount}
          onChange={(e) => setNewDiscount({ ...newDiscount, fixedAmount: parseFloat(e.target.value) })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={newDiscount.discountType}
          onChange={(e) => setNewDiscount({ ...newDiscount, discountType: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="PERCENTAGE">Phần trăm</option>
          <option value="FIXED_AMOUNT">Số tiền cố định</option>
        </select>
      </div>

      <Button className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
        Thêm mã giảm giá
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
                  <TableCell className="p-3 text-red-500 cursor-pointer">
                    {/* <button onClick={() => handleDeleteDiscount(discount.id)}>Xóa</button> */}
                    Xóa
                  </TableCell>
                  <TableCell className="p-3">{discount.code}</TableCell>
                  <TableCell className="p-3">{discount.percentage}%</TableCell>
                  <TableCell className="p-3">{new Date(discount.startDate).toLocaleString()}</TableCell>
                  <TableCell className="p-3">{new Date(discount.endDate).toLocaleString()}</TableCell>
                  <TableCell className="p-3">
                    <Checkbox checked={discount.isActive} disabled />
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

export default AddDiscountPage;
