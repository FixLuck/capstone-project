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
import { formatterToVND } from "@/utils/formatter";

const schema = z
  .object({
    username: z.string().min(2, { message: "username is required" }),
    finalTotal: z.number(), // Cho phép null hoặc không nhập
    orderDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Start date must be a valid date",
    }),
    orderStatus: z.string(),
  });

export default function UpdateMemberOrderHistory ({ orderId }) {
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

  const [customerOrder, setCustomerOrder] = useState({});



  useEffect(() => {
    const fetchCustomerOrder = async () => {
    setIsLoading(true);
    try {
    const { data } = await api.get(`order-details/order/${orderId}`); 
    reset({
      finalTotal: data.result.finalTotal, 
      orderStatus: data.result.orderStatus,
      username: data.result.username, 
      orderDate: new Date(data.result.orderDate).toISOString().slice(0, 16), // Chuyển đổi startDate sang ISO 8601

    });
  } catch (error) {
    console.error("Error fetching order:", error);
    toast.error("Failed to fetch order details.");
  } finally {
    setIsLoading(false);
  }
};
    fetchCustomerOrder();
  }, [orderId, reset]);


  const onSubmit = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading("Updating discount...");
    try {
      console.log("Form data submitted:", data);

      // Gửi yêu cầu API với dữ liệu `data`
      const response = await api.put(`order-details/order/${orderId}`, {
        ...data,
       
        finalTotal: data.finalTotal, 
        username: data.username, 
        orderDate: new Date(data.orderDate).toISOString(),
        
      });

      if (response.status === 200 && response.data.flag) {
        toast.update(toastId, {
          render: "Order updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        toast.update(toastId, {
          render: response.data.message || "Failed to update Order.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating Order:", error);
      toast.update(toastId, {
        render: "An error occurred while updating the Order.",
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
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin đơn hàng chi tiết</DialogTitle>
          <DialogDescription>
            Thay đổi trạng thái đơn hàng ở đây. Lưu thay đổi khi bạn hoàn thành.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Tên người dùng</Label>
            <Input
              id="username"
              name="username"
              defaultValue={customerOrder.username}
              {...register("username")}
              disabled
            />
            {errors.username?.message && <p className="text-red-600">{errors.username?.message}</p>}
          </div>





          <div className="space-y-2">
            <Label htmlFor="finalTotal">Tổng cộng</Label>
            <Input
              id="finalTotal"
              name="finalTotal"
              type="number"
              step="0.01"
              defaultValue={customerOrder.finalTotal}
              {...register("finalTotal", { valueAsNumber: true })}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderDate">Ngày đặt hàng</Label>
            <Input
              id="orderDate"
              type="datetime-local"
              defaultValue={customerOrder.orderDate}
              {...register("orderDate")}
              disabled
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="orderStatus">Order Status</Label>
            <select {...register("orderStatus")} className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base">
                <option className="text-orange-500" value="SHIPPED">Đã giao</option>
                <option className="text-purple-500" value="RECEIVED">Đã nhận</option>
                <option className="text-red-500" value="CANCELED">Đã hủy</option>
                <option className="text-yellow-500" value="PENDING">Chờ xử lý</option>
                <option className="text-green-500" value="PAID">Thanh toán thành công</option>
                <option className="text-amber-900" value="PAYMENT_FAILED">Thanh toán thất bại</option>
              </select>
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
