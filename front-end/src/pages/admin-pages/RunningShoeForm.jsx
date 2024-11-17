import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import ImagesUpload from "./ImagesUpload";
import VariantShoe from "./VariantShoe";
import axios from "axios";
import api from "@/config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

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

export default function RunningShoeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedFiles: [],
    images: [],
    variants: [],
  });

  const handleImagesSelect = (files) => {
    setFormData((prev) => ({
      ...prev,
      selectedFiles: files,
    }));
  };

  const uploadImages = async (files) => {
    const uploadPreset = "unsigned_preset";
    const cloudName = "dgdxkeu53";
    const images = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        images.push({
          url: response.data.secure_url,
          publicId: response.data.public_id,
        });
      }
      return images;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const handleVariantChange = (variantData) => {
    setFormData((prev) => {
      const existingVariantIndex = prev.variants.findIndex(
        (v) => v.sizeId === variantData.sizeId
      );

      let newVariants;
      if (existingVariantIndex >= 0) {
        newVariants = [...prev.variants];
        newVariants[existingVariantIndex] = variantData;
      } else {
        newVariants = [...prev.variants, variantData];
      }

      return {
        ...prev,
        variants: newVariants,
      };
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 10,
      description: "Mô tả giày đang được cập nhật",
      status: "true",
      fakePrice: 20,
      gender: "UNISEX",
      category: "RUNNING",
      brandId: 1,
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating product...");

    try {
      const uploadedImages = await uploadImages(formData.selectedFiles);
      const finalData = {
        ...data,
        images: uploadedImages,
        variants: formData.variants,
      };

      console.log(finalData);

      try {
        const response = await api.post("/shoes", finalData);
        if (response.status === 200) {
          console.log("Product created successfully:", response.data);

          toast.update(toastId, {
            render: "Product created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate("/admin/manage-shoes");
          }, 4000);
        }
      } catch (error) {
        console.error("Error creating product:", error);

        toast.update(toastId, {
          render: error.response?.data?.message || "Error creating product",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
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
        transition="Bounce"
      />
      <h1 className="text-2xl font-bold mb-4">Running Shoes Product Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="name">Tên sản phẩm</Label>
          <Input
            label="Tên sản phẩm"
            type="text"
            placeholder="Tên sản phẩm"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-600">{errors.name?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Giá</Label>
          <Input
            label="Giá"
            type="number"
            placeholder="Giá"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-red-600">{errors.price?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Input
            label="Mô tả"
            type="text"
            placeholder="Mô tả"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-600">{errors.description?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái:</Label>
          <select
            {...register("status")}
            className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
          >
            <option value="">Chọn trạng thái</option>
            <option value="true">Kích hoạt</option>
            <option value="false">Không kích hoạt</option>
          </select>
          {errors.status?.message && (
            <p className="text-red-600">{errors.status?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="fakePrice">Giá</Label> {/* Thay "Giá ảo" thành "Giá" */}
          <Input
            label="Giá"
            type="number"
            placeholder="Giá"
            {...register("fakePrice", { valueAsNumber: true })}
          />
          {errors.fakePrice?.message && (
            <p className="text-red-600">{errors.fakePrice?.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <Label htmlFor="gender">Giới tính:</Label>
            <select
              {...register("gender")}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
            >
              <option value="WOMEN">Nữ</option>
              <option value="MAN">Nam</option>
              <option value="UNISEX">Unisex</option>
            </select>
            {errors.gender?.message && (
              <p className="text-red-600">{errors.gender?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục:</Label>
            <select
              {...register("category")}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
            >
              <option value="RUNNING">Giày chạy</option>
              <option value="SPORT">Giày thể thao</option>
              <option value="CASUAL">Giày thường</option>
            </select>
            {errors.category?.message && (
              <p className="text-red-600">{errors.category?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandId">Thương hiệu:</Label>
            <select
              {...register("brandId", { valueAsNumber: true })}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
            >
              <option value="1">Nike</option>
              <option value="2">Adidas</option>
              <option value="3">Puma</option>
              <option value="4">Reebok</option>
            </select>
            {errors.brandId?.message && (
              <p className="text-red-600">{errors.brandId?.message}</p>
            )}
          </div>
        </div>
        <ImagesUpload onImagesSelect={handleImagesSelect} />
        <VariantShoe
          variants={formData.variants}
          onVariantChange={handleVariantChange}
        />

        <Separator className="my-4" />
        <Button type="submit">Gửi</Button>
      </form>
    </div>
  );
}
