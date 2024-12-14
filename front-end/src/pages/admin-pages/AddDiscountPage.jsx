import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Home, ShoppingCart, Tag } from "lucide-react";

const schema = z.object({
  code: z.string().min(2),
  description: z.string().min(5),
  discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"]),
  percentage: z.number().nullable().optional(),
  fixedAmount: z.number().nullable().optional(),
  minimumOrderAmount: z.number().nullable().default(0), // Nếu không nhập thì mặc định là 0
  startDate: z.string(),
  endDate: z.string(),
  active: z.enum(["true", "false"])
}).refine((data) => {
  if (data.discountType === "PERCENTAGE") {
    return data.percentage != null && data.fixedAmount == null;
  } else {
    return data.fixedAmount != null && data.percentage == null;
  }
}, {
  message: "Please provide either percentage or fixed amount based on discount type",
  path: ["discountType"]
});

export default function AddDiscountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const [value, setValue] = useState(initialValue);
  const { setValue } = useForm();


  useEffect(() => {
    // Nếu discountType là FIXED_AMOUNT, đảm bảo fixedAmount có thể nhập được
    if (watch("discountType") === "FIXED_AMOUNT") {
      setValue("fixedAmount", 0); // Hoặc giá trị mặc định khác
    } else {
      setValue("fixedAmount", null); // Đặt lại giá trị nếu discountType không phải FIXED_AMOUNT
    }
  }, [watch("discountType")]); // Theo dõi sự thay đổi của discountType



  const onSubmit = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading("Adding discount...");
    try {
      // Validate dates
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
  
      if (startDate >= endDate) {
        throw new Error("Start date must be before end date");
      }
  
      // Format the data
      const formattedData = {
        code: data.code,
        description: data.description,
        discountType: data.discountType,
        active: data.active === "true",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        minimumOrderAmount: data.minimumOrderAmount || 0,  // Đảm bảo giá trị không null, nếu trống thì set là 0
        percentage: data.discountType === "PERCENTAGE" ? data.percentage : null,
        fixedAmount: data.discountType === "FIXED_AMOUNT" ? data.fixedAmount : null,
      };
  
      console.log("Sending data:", formattedData);
  
      // Send to API
      const response = await api.post("/discounts", formattedData);
  
      if (response.status === 200 || response.status === 201) {
        toast.update(toastId, {
          render: "Discount added successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        throw new Error(response.data.message || "Failed to add discount");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);
      toast.update(toastId, {
        render: error.response?.data?.message || error.message || "Failed to add discount",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="p-6 max-w-full h-screen mx-auto bg-white rounded-lg shadow-md">
      <ToastContainer 
        position="top-right" 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" />
         <div className="flex items-center justify-between mb-4">
      <Link to={"/admin/discount-management"}>
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay Lại
        </Button>
        </Link>
        <h1 className="text-4xl font-bold">Chi tiết đơn hàng</h1>
        <div className="w-24" /> {/* Spacer for alignment */}
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thêm Mã Giảm Giá</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="code" className="block text-gray-700">Tên mã</Label>
          <Input
            id="code"
            name="code"
            placeholder="Nhập tên mã"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("code")}
          />
          {errors.code?.message && <p className="text-red-600 text-sm">{errors.code?.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="block text-gray-700">Mô tả</Label>
          <Input
            id="description"
            name="description"
            placeholder="Nhập mô tả"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("description")}
          />
          {errors.description?.message && <p className="text-red-600 text-sm">{errors.description?.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="active" className="block text-gray-700">Trạng thái</Label>
            <select
              {...register("active")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="true">Hoạt động</option>
              <option value="false">Tắt</option>
            </select>
            {errors.active?.message && <p className="text-red-600 text-sm">{errors.active?.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountType" className="block text-gray-700">Loại giảm giá</Label>
            <select
              {...register("discountType")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="FIXED_AMOUNT">Số tiền cố định</option>
              <option value="PERCENTAGE">Phần trăm</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="percentage" className="block text-gray-700">Phần trăm</Label>
          <Input
            id="percentage"
            name="percentage"
            type="number"
            disabled={watch("discountType") !== "PERCENTAGE"}
            {...register("percentage", {
              setValueAs: v => watch("discountType") === "PERCENTAGE" ? Number(v) : null
            })}
          />
          {errors.percentage?.message && <p className="text-red-600 text-sm">{errors.percentage?.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fixedAmount" className="block text-gray-700">Số tiền cố định</Label>
          <Input
            id="fixedAmount"
            name="fixedAmount"
            type="number"
            disabled={watch("discountType") !== "FIXED_AMOUNT"}
            {...register("fixedAmount", {
              setValueAs: v => watch("discountType") === "FIXED_AMOUNT" ? Number(v) : null
            })}
          />
          {errors.fixedAmount?.message && <p className="text-red-600 text-sm">{errors.fixedAmount?.message}</p>}
        </div>


        <div className="space-y-2">
          <Label htmlFor="minimumOrderAmount" className="block text-gray-700">Số tiền đơn hàng tối thiểu</Label>
          <Input
  type="number"
  name="minimumOrderAmount"
  id="minimumOrderAmount"
  {...register("minimumOrderAmount", {
    valueAsNumber: true, // Đảm bảo giá trị được lấy dưới dạng số
    validate: (value) => value >= 0 || "Minimum order amount cannot be negative", // Kiểm tra trường hợp âm
  })}
  defaultValue={0}  // Đảm bảo giá trị mặc định là 0
/>


        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="block text-gray-700">Ngày bắt đầu</Label>
          <Input
            id="startDate"
            type="datetime-local"
            {...register("startDate", {
              validate: value => {
                const startDate = new Date(value);
                return startDate >= new Date() || "Start date must be in the future";
              }
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate" className="block text-gray-700">Ngày kết thúc</Label>
          <Input
            id="endDate"
            type="datetime-local"
            {...register("endDate", {
              validate: (value, formValues) => {
                const startDate = new Date(formValues.startDate);
                const endDate = new Date(value);
                return endDate > startDate || "End date must be after start date";
              }
            })}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          {/* <Button 
            variant="outline"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-300"
          >
            Cancel
          </Button> */}
          <Button 
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isLoading ? "Saving..." : "Save Discount"}
          </Button>
        </div>
      </form>
    </div>
  );
}
