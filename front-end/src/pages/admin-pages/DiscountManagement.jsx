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
  useEffect(() => {
    const fetchDiscounts = async () => {
      const { data } = await api.get("discounts");
      setDiscounts(data.result);
    };

    fetchDiscounts();
  }, []);
  // const [newDiscount, setNewDiscount] = useState({
  //   percentage: 0,
  //   startDate: '',
  //   endDate: '',
  //   code: '',
  //   minimumOrderAmount: 0,
  //   description: '',
  //   fixedAmount: 0,
  //   discountType: 'PERCENTAGE',
  //   isActive: true
  // });

  // useEffect(() => {
  //   fetchDiscounts();
  // }, []);

  // const fetchDiscounts = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/v1/discounts');
  //     if (Array.isArray(response.data.result)) {
  //       setDiscounts(response.data.result);
  //     } else {
  //       console.error('Dữ liệu trả về không phải là mảng trong thuộc tính result:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching discounts:', error);
  //   }
  // };


  //  Hàm thêm mã giảm giá mới
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
  //     console.error("Error adding discount:", error);
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
    <div className="p-6 max-w-full h-screen mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Discount Management</h1>
      <Button variant="outline" className="hover:bg-green-600 hover:text-white">
        <Link to={"/admin/discount-management/new"} className="flex p-4 align-items-center">
          <IoIosAddCircleOutline className="mr-2 h-10 w-10" />
          <span>Add</span>
        </Link>
      </Button>
      
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          type="text"
          placeholder="Code"
          value={newDiscount.code}
          onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Percentage"
          value={newDiscount.percentage}
          onChange={(e) => setNewDiscount({ ...newDiscount, percentage: parseFloat(e.target.value) })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="datetime-local"
          placeholder="Start Date"
          value={newDiscount.startDate}
          onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          value={newDiscount.endDate}
          onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Minimum Order Amount"
          value={newDiscount.minimumOrderAmount}
          onChange={(e) => setNewDiscount({ ...newDiscount, minimumOrderAmount: parseFloat(e.target.value) })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <textarea
          placeholder="Description"
          value={newDiscount.description}
          onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 col-span-full"
          style={{ height: '3rem' }}
        />
        <input
          type="number"
          placeholder="Fixed Amount"
          value={newDiscount.fixedAmount}
          onChange={(e) => setNewDiscount({ ...newDiscount, fixedAmount: parseFloat(e.target.value) })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={newDiscount.discountType}
          onChange={(e) => setNewDiscount({ ...newDiscount, discountType: e.target.value })}
          className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="PERCENTAGE">Percentage</option>
          <option value="FIXED_AMOUNT">Fixed Amount</option>
        </select>
      </div> */}



      {/* Danh sách mã giảm giá */}
      <div className="mt-10">
        <Table className="w-full">
          <TableCaption className="text-gray-500">A list of your recent discounts.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableCell className="p-3 font-semibold">Edit</TableCell>
              <TableCell className="p-3 font-semibold">Code</TableCell>
              <TableCell className="p-3 font-semibold">Discount Type</TableCell>
              <TableCell className="p-3 font-semibold">Start Day</TableCell>
              <TableCell className="p-3 font-semibold">End Day</TableCell>
              <TableCell className="p-3 font-semibold">Active</TableCell>
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
                  No discounts available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


