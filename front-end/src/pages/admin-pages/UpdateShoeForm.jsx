import React, { useState } from "react";
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
import { useEffect } from "react";
import api from "@/config/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import VariantShoeOnUpdateForm from "./VariantShoeOnUpdateForm";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const schema = z.object({
  name: z.string().min(2, { message: "Required" }),
  price: z.number().min(10, { message: "Required" }),
  description: z.string().min(10),
  status: z
    .enum(["true", "false"], {
      invalid_type_error: "Status must be a boolean",
      required_error: "Status is required",
    })
    .transform((value) => value === "true"),
  fakePrice: z.number().min(10, { message: "Required" }),
  gender: z.string(),
  category: z.string(),
  brandId: z.number(),
});

export default function UpdateShoeForm({ shoeId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [shoe, setShoe] = React.useState({});
  const [updatedVariants, setUpdatedVariants] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVariantChange = (variantId, quantity) => {
    setUpdatedVariants((prev) => ({
      ...prev,
      [variantId]: quantity,
    }));
  };

  useEffect(() => {
    const fetchShoe = async () => {
      const { data } = await api.get(`shoes/${shoeId}`);
      setShoe(data.result);
      reset(data.result);

      const initialVariants = {};
      data.result.variants?.forEach((variant) => {
        initialVariants[variant.id] = variant.stockQuantity;
      });
      setUpdatedVariants(initialVariants);
    };
    fetchShoe();
  }, [shoeId, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading("Updating product...");
    try {
      const formData = {
        ...data,
        variants: shoe.variants.map((variant) => ({
          variantId: variant.id,
          stockQuantity: updatedVariants[variant.id] ?? variant.stockQuantity,
        })),
      };
      console.log(formData);
      try {
        const response = await api.put(`shoes/${shoeId}`, formData);
        if (response.status === 200) {
          console.log("Product updated successfully:", response.data);
          toast.update(toastId, {
            render: "Product updated successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setIsLoading(false);
          setTimeout(() => {
            navigate("/admin");
          }, 4000);
        } else {
          toast.update(toastId, {
            render: "Failed to update product",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error updating product:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
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
        theme="light"
        transition:Bounce
      />
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-slate-950 hover:text-white"
        >
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin giày</DialogTitle>
          <DialogDescription>
           Thay đổi thôn tin giày ở đây. Lưu thay đổi khi bạn nhập xong.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              name="name"
              defaultValue={shoe.name}
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Giá</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={shoe.price}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price?.message && (
                <p className="text-red-600">{errors.price?.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fakePrice">Giá niêm yết</Label>
              <Input
                id="fakePrice"
                name="fakePrice"
                type="number"
                step="0.01"
                defaultValue={shoe.fakePrice}
                {...register("fakePrice", { valueAsNumber: true })}
              />
              {errors.fakePrice?.message && (
                <p className="text-red-600">{errors.fakePrice?.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Input
              id="description"
              name="description"
              defaultValue={shoe.description}
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              <select
                {...register("gender")}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
              >
                <option value="WOMEN">Nữ</option>
                <option value="MAN">Nam</option>
                <option value="UNISEX">UNISEX</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Thể loại</Label>
              <select
                {...register("category")}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
              >
                <option value="RUNNING">Chạy bộ</option>
                <option value="SPORT">Thể thao</option>
                <option value="CASUAL">Thời trang</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brandId">Nhãn hiệu:</Label>
              <select
                {...register("brandId", { valueAsNumber: true })}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
              >
                <option value="1">Nike</option>
                <option value="2">Adidas</option>
                <option value="3">Puma</option>
                <option value="4">Reebok</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái:</Label>
            <select
              {...register("status")}
              className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
            >
              <option value="">Chọn trạng thái</option>
              <option value="true">Hoạt động</option>
              <option value="false">Tắt</option>
            </select>
            {errors.status?.message && (
              <p className="text-red-600">{errors.status?.message}</p>
            )}
          </div>

          <VariantShoeOnUpdateForm
            variants={shoe.variants}
            onVariantChange={handleVariantChange}
            updatedVariants={updatedVariants}
          />

          <Separator className="my-4" />

          <DialogFooter>
            <Button  type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
