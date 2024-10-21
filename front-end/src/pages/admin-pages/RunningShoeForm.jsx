import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";


const schema = z.object({
  name: z.string().min(2, { message: "Required" }),
  price: z.number().min(10, { message: "Required" }),
  description: z.string().min(10),
  status: z
    .enum(["true", "false"], {
      invalid_type_error: "Please set the",
      required_error: "Status is required",
    })
    .transform((value) => value === "true"),
  //   fakePrice: z.number().min(10, { message: "Required" }),
  //   gender: z.string(),
  //   category: z.string(),
  //   brandId: z.number(),
});

export default function RunningShoeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Running Shoes Product Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            label="Name"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="text-red-600">{errors.name?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            label="Price"
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-red-600">{errors.price?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            label="Price"
            type="text"
            placeholder="Description"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-600">{errors.description?.message}</p>
          )}
        </div>
        <div className="space-y-2">
        <Label htmlFor="status">Status:</Label>
          <select {...register("status")} className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base">
            <option value="">Select status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {errors.status?.message && (
            <p className="text-red-600">{errors.status?.message}</p>
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
