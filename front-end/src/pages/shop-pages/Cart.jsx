import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

import { ComboboxSortDiscount } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
export function Cart() {
  return (


    <div className="bg-white h-full mb-10 p-10">
        <h1 className="" align="center"></h1>
        <div className="mt-10 p-10">

        <Table className="">
          <TableCaption>A list of your cart.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Image</TableHead>
              <TableHead className="w-[250px]">Product Name</TableHead>
              <TableHead className="w-[150px]">Quantity</TableHead>
              <TableHead className="w-[200px]">Unit Price</TableHead>
              <TableHead className="w-[200px]">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div>image here</div>
              </TableCell>
              <TableCell>
                <div>
                  <div>kd 15</div>
                  <div>size 9 male</div>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  className="bg-white"
                  type="number"
                  min={0}
                  defaultValue={1}
                  max={10}
                />
              </TableCell>
              <TableCell>150$</TableCell>
              <TableCell>300$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-10 m-10">
        <Card className=" card p-5 border-solid  h-fit">
          <CardContent>
            <Input
              className="bg-white "
              id="discount"
              placeholder="Discount code"
            ></Input>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
        <div className="sm:col-span-8"></div>
        <div className="sm:col-span-4 me-10">
          <Textarea className="bg-white" placeholder="Total" />
        </div>
      </div>

        <div className="grid gap-4 sm:grid-cols-12 grid-cols-1 mt-2">
        <div className="sm:col-span-8 ms-10">
          <Link to={'/'}><Button>Continue Shopping</Button></Link></div>
        <div className="sm:col-span-4 ">
          <Link to={'/checkout'}><Button>Checkout</Button></Link></div>
        </div>
      </div>
    
  );
}
export default Cart;
