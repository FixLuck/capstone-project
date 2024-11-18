import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";

const schema = z
  .object({
    code: z.string().min(2, { message: "Code is required" }),
    discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"]),
    percentage: z.number().nullable(),
    fixedAmount: z.number().nullable(),
    minimumOrderAmount: z.number().nullable(),
    description: z.string().min(5, { message: "Description must be at least 5 characters" }),
    active: z
    .enum(["true", "false"], {
      invalid_type_error: "Status must be a boolean",
      required_error: "Status is required",
    })
    .transform((value) => value === "true"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start date" }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end date" }),
  })
  .superRefine((data, ctx) => {
    if (data.discountType === "PERCENTAGE" && data.percentage === null) {
      ctx.addIssue({
        path: ["percentage"],
        message: "Percentage is required for type PERCENTAGE",
      });
    }
    if (data.discountType === "FIXED_AMOUNT" && data.fixedAmount === null) {
      ctx.addIssue({
        path: ["fixedAmount"],
        message: "Fixed amount is required for type FIXED_AMOUNT",
      });
    }
  });



export default function UpdateDiscountForm({ discountId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [discount, setDiscount] = useState({
    discountType: "PERCENTAGE",
    percentage: null,
    minimumOrderAmount: null,
    fixedAmount: null,
    description: "",
    active: true,
    startDate: new Date(),
    endDate: new Date(),
    code: "",
  });

  const discountType = watch("discountType");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDiscount = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`discounts/${discountId}`);
        console.log("Fetched data:", data); // Kiểm tra dữ liệu từ API
        reset({
          ...data.result,
          startDate: data.result.startDate
            ? new Date(data.result.startDate).toISOString().slice(0, 16)
            : "",
          endDate: data.result.endDate
            ? new Date(data.result.endDate).toISOString().slice(0, 16)
            : "",
        });
      } catch (error) {
        console.error("Error fetching discount:", error);
        toast.error("Failed to fetch discount details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscount();
  }, [discountId, reset]);
  

  if (isLoading) return <div>Loading...</div>;

  const onSubmit = async (data) => {
    console.log("Data before validation:", data);
  
    try {
      // Validate dữ liệu trước khi gửi
      const validatedData = schema.parse(data);
      setIsLoading(true);
      
      // Tạo toast loading
      const toastId = toast.loading("Updating Discount...");
  
      // Chuẩn bị dữ liệu gửi đi
      const formData = {
        ...validatedData,
        percentage: validatedData.percentage || null,
        fixedAmount: validatedData.fixedAmount || null,
        minimumOrderAmount: validatedData.minimumOrderAmount || null,
        startDate: new Date(validatedData.startDate).toISOString(),
        endDate: new Date(validatedData.endDate).toISOString(),
      };
  
      console.log("Sending form data to API:", formData);
  
      // Gọi API update
      const response = await api.put(`discounts/${discountId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("API response:", response);
  
      // Kiểm tra phản hồi từ API
      if (response.data && response.data.flag === true) {
        // Cập nhật toast thành công
        toast.update(toastId, {
          render: "Discount updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
  
        // Chuyển hướng sau khi thành công
        setTimeout(() => {
          navigate("/admin/discounts");
        }, 2000);
      } else {
        // Xử lý trường hợp API trả về lỗi
        toast.update(toastId, {
          render: response.data?.message || "Failed to update discount",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Xử lý lỗi validation hoặc API
      console.error("Error:", error);
  
      // Kiểm tra nếu là lỗi validation từ Zod
      if (error instanceof z.ZodError) {
        // Hiển thị lỗi validation chi tiết
        const errorMessages = error.errors.map(err => `${err.path}: ${err.message}`).join('\n');
        toast.error(`Validation Error:\n${errorMessages}`, {
          autoClose: 5000,
        });
      } else if (error.response) {
        // Lỗi từ phía server
        toast.error(error.response.data.message || "An error occurred while updating the discount");
      } else {
        // Lỗi không xác định
        toast.error("An unexpected error occurred");
      }
    } finally {
      // Luôn đặt loading về false
      setIsLoading(false);
    }
  };
  
  
  
  
  

  return (
    <Dialog className="min-h-screen">
      <ToastContainer position="top-right" hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-slate-950 hover:text-white">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Discount Details</DialogTitle>
          <DialogDescription>
            Make changes to your discount here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input id="code" name="code" defaultValue={discount.code} {...register("code")} />
            {errors.code?.message && <p className="text-red-600">{errors.code?.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="active">Active:</Label>
              <select {...register("active")} className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              {errors.active?.message && <p className="text-red-600">{errors.active?.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountType">Discount Type</Label>
              <select {...register("discountType")} className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base">
                <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
                <option value="PERCENTAGE">PERCENTAGE</option>
              </select>
            </div>
          </div>

          {discountType === "FIXED_AMOUNT" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fixedAmount">Fixed Amount</Label>
                <Input id="fixedAmount" name="fixedAmount" type="number" step="0.01" defaultValue={discount.fixedAmount} {...register("fixedAmount", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage">Percentage</Label>
                <Input id="percentage" name="percentage" type="number" step="0.01" defaultValue={discount.percentage} {...register("percentage", { valueAsNumber: true })} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumOrderAmount">Minimum Order Amount</Label>
                <Input id="minimumOrderAmount" name="minimumOrderAmount" type="number" step="0.01" defaultValue={discount.minimumOrderAmount} {...register("minimumOrderAmount", { valueAsNumber: true })} />
              </div>
            </>
          )}

          {discountType === "PERCENTAGE" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="percentage">Percentage</Label>
                <Input id="percentage" name="percentage" type="number" step="0.01" defaultValue={discount.percentage} {...register("percentage", { valueAsNumber: true })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fixedAmount">Fixed Amount</Label>
                <Input id="fixedAmount" name="fixedAmount" type="number" step="0.01" defaultValue={discount.fixedAmount} {...register("fixedAmount", { valueAsNumber: true })} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumOrderAmount">Minimum Order Amount</Label>
                <Input id="minimumOrderAmount" name="minimumOrderAmount" type="number" step="0.01" defaultValue={discount.minimumOrderAmount} {...register("minimumOrderAmount", { valueAsNumber: true })} disabled />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input type="datetime-local" id="startDate" name="startDate" defaultValue={discount.startDate} {...register("startDate")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input type="datetime-local" id="endDate" name="endDate" defaultValue={discount.endDate} {...register("endDate")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" defaultValue={discount.description} {...register("description")} />
            {errors.description?.message && <p className="text-red-600">{errors.description?.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
