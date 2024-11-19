import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";
import "react-toastify/dist/ReactToastify.css";


// // Schema cập nhật
// const schema = z.object({
//   code: z.string().min(2, { message: "Code is required" }),
//   discountType: z.string(),
//   percentage: z
//     .number()
//     .nullable()
//     .optional()
//     .or(z.literal("")), // Chấp nhận giá trị rỗng
//   fixedAmount: z
//     .number()
//     .nullable()
//     .optional()
//     .or(z.literal("")), // Chấp nhận giá trị rỗng
//   minimumOrderAmount: z.number().default(0),
//   description: z.string().min(5, { message: "Description must be at least 5 characters" }),

//   startDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
//     message: "Start date must be a valid date",
//   }),

//   endDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
//     message: "End date must be a valid date",
//   }),

//   active: z.enum(["true", "false"], {
//     invalid_type_error: "Status must be a boolean",
//     required_error: "Status is required",
//   }),
// });
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

  // const onSubmit = async (data) => {
  //   setIsLoading(true);
  //   const toastId = toast.loading("Adding discount...");
  //   try {
  //     console.log("Form data submitted:", data);

  //     // Xử lý giá trị rỗng thành null
  //     const formattedData = {
  //       ...data,
  //       percentage: data.percentage === "" ? null : data.percentage,
  //       fixedAmount: data.fixedAmount === "" ? null : data.fixedAmount,
  //       minimumOrderAmount: data.minimumOrderAmount === "" ? 0 : data.minimumOrderAmount, // Nếu trống, set là 0
  //       startDate: new Date(data.startDate).toISOString(),
  //       endDate: new Date(data.endDate).toISOString(),
  //     };

  //     // const formattedData = {
  //     //   ...data,
  //     //   percentage:
  //     //     data.discountType === "PERCENTAGE"
  //     //       ? parseFloat(data.percentage || 0)
  //     //       : null, // Chỉ gửi khi discountType là PERCENTAGE
  //     //   fixedAmount:
  //     //     data.discountType === "FIXED_AMOUNT"
  //     //       ? parseFloat(data.fixedAmount || 0)
  //     //       : null, // Chỉ gửi khi discountType là FIXED_AMOUNT
  //     //   minimumOrderAmount:
  //     //     data.discountType === "PERCENTAGE"
  //     //       ? null
  //     //       : parseFloat(data.minimumOrderAmount || 0), // Bỏ qua nếu discountType là PERCENTAGE
  //     //       startDate: formatISO(new Date(data.startDate)),
  //     //       endDate: formatISO(new Date(data.endDate)),
  //     //       active: data.active === "true", // Chuyển đổi thành boolean
  //     // };
      

  //     const response = await api.post("/discounts", formattedData);

  //     if (response.status === 200 && response.data.flag) {
  //       toast.update(toastId, {
  //         render: "Discount added successfully!",
  //         type: "success",
  //         isLoading: false,
  //         autoClose: 2000,
  //       });
  //       setTimeout(() => navigate("/admin"), 2000);
  //     } else {
  //       toast.update(toastId, {
  //         render: response.data.message || "Failed to add discount.",
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding discount:", error);
  //     toast.update(toastId, {
  //       render: "An error occurred while adding the discount.",
  //       type: "error",
  //       isLoading: false,
  //       autoClose: 2000,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        minimumOrderAmount: data.minimumOrderAmount === "" ? 0 : data.minimumOrderAmount,  // Nếu không có giá trị, gán giá trị 0.0
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
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
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Discount</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="code" className="block text-gray-700">Code</Label>
          <Input
            id="code"
            name="code"
            placeholder="Enter discount code"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("code")}
          />
          {errors.code?.message && <p className="text-red-600 text-sm">{errors.code?.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="block text-gray-700">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Enter discount description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("description")}
          />
          {errors.description?.message && <p className="text-red-600 text-sm">{errors.description?.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="active" className="block text-gray-700">Active</Label>
            <select
              {...register("active")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {errors.active?.message && <p className="text-red-600 text-sm">{errors.active?.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountType" className="block text-gray-700">Discount Type</Label>
            <select
              {...register("discountType")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="FIXED_AMOUNT">Fixed Amount</option>
              <option value="PERCENTAGE">Percentage</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="percentage" className="block text-gray-700">Percentage</Label>
          <Input
            id="percentage"
            type="number"
            disabled={watch("discountType") !== "PERCENTAGE"}
            {...register("percentage", {
              setValueAs: v => watch("discountType") === "PERCENTAGE" ? Number(v) : null
            })}
          />
          {errors.percentage?.message && <p className="text-red-600 text-sm">{errors.percentage?.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fixedAmount" className="block text-gray-700">Fixed Amount</Label>
          <Input
            id="fixedAmount"
            type="number"
            disabled={watch("discountType") !== "FIXED_AMOUNT"}
            {...register("fixedAmount", {
              setValueAs: v => watch("discountType") === "FIXED_AMOUNT" ? Number(v) : null
            })}
          />
          {errors.fixedAmount?.message && <p className="text-red-600 text-sm">{errors.fixedAmount?.message}</p>}
        </div>


        <div className="space-y-2">
          <Label htmlFor="minimumOrderAmount" className="block text-gray-700">Minimum Order Amount</Label>
          <Input
            type="number"
            name="minimumOrderAmount"
            id="minimumOrderAmount"
            defaultValue={0}
            onChange={(e) => setValue("minimumOrderAmount", e.target.value)}
            {...register("description")}

          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="block text-gray-700">Start Date</Label>
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
          <Label htmlFor="endDate" className="block text-gray-700">End Date</Label>
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
          <Button 
            variant="outline"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-300"
          >
            Cancel
          </Button>
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
