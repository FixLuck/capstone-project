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
    discountType: z.string(),
    percentage: z.number().nullable().optional(), // Cho phép null hoặc không nhập
    fixedAmount: z.number().nullable().optional(), // Cho phép null hoặc không nhập
    minimumOrderAmount: z.number().nullable().default(0), // Nếu không nhập thì mặc định là 0
    description: z.string().min(5, { message: "Description must be at least 5 characters" }),
    startDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Start date must be a valid date",
    }),
    endDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "End date must be a valid date",
    }),
    active: z
      .enum(["true", "false"], {
        invalid_type_error: "Status must be a boolean",
        required_error: "Status is required",
      }),
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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [discount, setDiscount] = useState({});

  useEffect(() => {
    const fetchDiscount = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`discounts/${discountId}`);
        reset({
          ...data.result,
          percentage: data.result.percentage ?? null, // Gán null nếu không có giá trị
          fixedAmount: data.result.fixedAmount ?? null, // Gán null nếu không có giá trị
          minimumOrderAmount: data.result.minimumOrderAmount ?? 0, // Gán 0 nếu không có giá trị
          description: data.result.description ?? "", // Thêm trường description
          startDate: new Date(data.result.startDate).toISOString().slice(0, 16), // Chuyển đổi startDate sang ISO 8601
          endDate: new Date(data.result.endDate).toISOString().slice(0, 16), // Chuyển đổi endDate sang ISO 8601
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading("Updating discount...");
    try {
      console.log("Form data submitted:", data);

      // Gửi yêu cầu API với dữ liệu `data`
      const response = await api.put(`discounts/${discountId}`, {
        ...data,
        percentage: data.percentage === "" ? null : data.percentage, // Nếu trống, set là null
        fixedAmount: data.fixedAmount === "" ? null : data.fixedAmount, // Nếu trống, set là null
        minimumOrderAmount: data.minimumOrderAmount === "" ? 0 : data.minimumOrderAmount, // Nếu trống, set là 0
        startDate: new Date(data.startDate).toISOString(), // Chuyển startDate sang ISO 8601
        endDate: new Date(data.endDate).toISOString(), // Chuyển endDate sang ISO 8601
        
      });

      if (response.status === 200 && response.data.flag) {
        toast.update(toastId, {
          render: "Discount updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        toast.update(toastId, {
          render: response.data.message || "Failed to update discount.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating discount:", error);
      toast.update(toastId, {
        render: "An error occurred while updating the discount.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog className="min-h-screen">
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
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-slate-950 hover:text-white">
          Chỉnh Sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin mã giảm chi tiết</DialogTitle>
          <DialogDescription>
            Thay đổi thông tin giảm giá ở đây. Nhấn Lưu khi bạn đã nhập xong các thay đổi.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code">Tên mã</Label>
            <Input
              id="code"
              name="code"
              defaultValue={discount.code}
              {...register("code")}
            />
            {errors.code?.message && <p className="text-red-600">{errors.code?.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Input
              id="description"
              name="description"
              defaultValue={discount.description}
              {...register("description")}
            />
            {errors.description?.message && <p className="text-red-600">{errors.description?.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="active">Trạng thái:</Label>
              <select {...register("active")} className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base">
                <option value="true">Hoạt động</option>
                <option value="false">Tắt</option>
              </select>
              {errors.active?.message && <p className="text-red-600">{errors.active?.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountType">Loại giảm giá</Label>
              <select {...register("discountType")} className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base">
                <option value="FIXED_AMOUNT">Số tiền cố định</option>
                <option value="PERCENTAGE">Phần trăm</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage">Phần trăm</Label>
            <Input
              id="percentage"
              name="percentage"
              type="number"
              step="0.01"
              defaultValue={discount.percentage ?? null}
              {...register("percentage", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fixedAmount">Số tiền cố định</Label>
            <Input
              id="fixedAmount"
              name="fixedAmount"
              type="number"
              step="0.01"
              defaultValue={discount.fixedAmount ?? null}
              {...register("fixedAmount", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimumOrderAmount">Số tiền đơn hàng tối thiểu</Label>
            <Input
              id="minimumOrderAmount"
              name="minimumOrderAmount"
              type="number"
              step="0.01"
              defaultValue={discount.minimumOrderAmount ?? 0}
              {...register("minimumOrderAmount", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Ngày bắt đầu</Label>
            <Input
              id="startDate"
              type="datetime-local"
              defaultValue={discount.startDate}
              {...register("startDate")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Ngày kết thúc</Label>
            <Input
              id="endDate"
              type="datetime-local"
              defaultValue={discount.endDate}
              {...register("endDate")}
            />
          </div>

          <DialogFooter>
            {/* <Button variant="outline" onClick={() => reset()}>
              Cancel
            </Button> */}
            <Button type="submit" disabled={isLoading} className="bg-blue-600 text-white hover:bg-blue-700">
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
