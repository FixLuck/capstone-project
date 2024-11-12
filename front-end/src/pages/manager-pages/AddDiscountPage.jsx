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

  // Hàm lấy danh sách mã giảm giá từ backend
  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/discounts');
      if (Array.isArray(response.data)) {
        setDiscounts(response.data);
      } else {
        console.error("Invalid response format, expected an array");
      }
    } catch (error) {
      console.error("Error fetching discounts:", error);
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
  //     console.error("Error adding discount:", error);
  //   }
  // };

  // Hàm xóa mã giảm giá
  // const handleDeleteDiscount = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/v1/discounts/${id}`);
  //     setDiscounts(prevDiscounts => prevDiscounts.filter(discount => discount.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting discount:", error);
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
    <div>
      <h1 className="mt-5 text-lg">Discount Management</h1>

      <div className="mt-5">
        <input
          type="text"
          placeholder="Code"
          value={newDiscount.code}
          onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
          className="mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Percentage"
          value={newDiscount.percentage}
          onChange={(e) => setNewDiscount({ ...newDiscount, percentage: parseFloat(e.target.value) })}
          className="mb-2 p-2 border"
        />
        <input
          type="datetime-local"
          placeholder="Start Date"
          value={newDiscount.startDate}
          onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
          className="mb-2 p-2 border"
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          value={newDiscount.endDate}
          onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
          className="mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Minimum Order Amount"
          value={newDiscount.minimumOrderAmount}
          onChange={(e) => setNewDiscount({ ...newDiscount, minimumOrderAmount: parseFloat(e.target.value) })}
          className="mb-2 p-2 border"
        />
        <textarea
          placeholder="Description"
          value={newDiscount.description}
          onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
          className="mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Fixed Amount"
          value={newDiscount.fixedAmount}
          onChange={(e) => setNewDiscount({ ...newDiscount, fixedAmount: parseFloat(e.target.value) })}
          className="mb-2 p-2 border"
        />
        <select
          value={newDiscount.discountType}
          onChange={(e) => setNewDiscount({ ...newDiscount, discountType: e.target.value })}
          className="mb-2 p-2 border"
        >
          <option value="PERCENTAGE">Percentage</option>
          <option value="FIXED_AMOUNT">Fixed Amount</option>
        </select>
        <Button  className="bg-green-500 text-indigo-50">Add Discount</Button>
      </div>

      {/* Danh sách mã giảm giá */}
      <div className="mt-10">
        <Table>
          <TableCaption>A list of your recent discounts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Start Day</TableCell>
              <TableCell>End Day</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(discounts) && discounts.length > 0 ? (
              discounts.map(discount => (
                <TableRow key={discount.id}>
                  <TableCell>
                    <button className="text-red-500">Delete</button>
                  </TableCell>
                  <TableCell>{discount.code}</TableCell>
                  <TableCell>{discount.percentage}%</TableCell>
                  <TableCell>{new Date(discount.startDate).toLocaleString()}</TableCell>
                  <TableCell>{new Date(discount.endDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <Checkbox checked={discount.isActive} disabled />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">No discounts available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AddDiscountPage;
