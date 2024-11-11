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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  name: z.string().min(2, { message: "Required" }),
  price: z.number().min(10, { message: "Required" }),
  description: z.string().min(10),
  status: z.boolean(),
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

  useEffect(() => {
    const fetchShoe = async () => {
      const { data } = await api.get(`shoes/${shoeId}`);
      setShoe(data.result);
      reset(data.result);
    };
    fetchShoe();
  }, [shoeId, reset]);

  const [status, setStatus] = useState(shoe.status)

  //   console.log(shoe);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog className='min-h-screen'>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-slate-950 hover:text-white"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Shoe Detail</DialogTitle>
          <DialogDescription>
            Make changes to your shoe here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
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
              <Label htmlFor="price">Price</Label>
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
              <Label htmlFor="fakePrice">Fake Price</Label>
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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              defaultValue={shoe.description}
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                {...register("gender")}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
              >
                <option value="WOMEN">WOMEN</option>
                <option value="MAN">MAN</option>
                <option value="UNISEX">UNISEX</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                {...register("category")}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3 pr-10 py-2 text-base"
              >
                <option value="RUNNING">RUNNING</option>
                <option value="SPORT">SPORT</option>
                <option value="CASUAL">CASUAL</option>
              </select>
            </div>
            <div className="space-y-2">
            <Label htmlFor="brandId">Brand:</Label>
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
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                {...register("status")}
                onCheckedChange={(e) => setStatus(prev => !prev)}
                value={status}
              />
              <Label htmlFor="status">Active Status</Label>
            </div>
          </div>

          <Separator className="my-4" />

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
