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

  return (
    <div className="p-6 max-w-full h-screen mx-auto bg-white rounded-lg shadow-md">
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


