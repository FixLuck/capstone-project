import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminAside from "@/components/admin-com/AdminAside";
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
import ManagerAside from "@/components/manager-com/ManagerAside";

export function MemberOrderHistory() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const options = ["newest", "oldest"];
  
  // Separate state for start date and end date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelection = (value) => {
    setSelectedOption(value);

    // Open the dialog if 'edit' is selected
    if (value === "edit") {
      setIsDialogOpen(true);
    }
  };

  return (
    
      <div >
        <h1 className="mt-5 text-lg" align="center">
          Members Order History
        </h1>

        <div className="mt-5">
          <div className="grid gap-4 sm:grid-cols-10 grid-cols-1">
            <div className="sm:col-span-4 mt-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#">2</PaginationLink>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="sm:col-span-5">
              <div className="grid gap-4 sm:grid-cols-6 grid-cols-1">
                <div className="sm:col-span-4">
                  <div className="relative mt-1">
                    <div className="grid gap-4 sm:grid-cols-4 grid-cols-1">
                    <div className="sm:col-span-2">
                    <Popover id="disStart" className="mb-2">
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
                    </div>
                    <div className="sm:col-span-2">
                    <Popover id="disEnd" className="mb-2">
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
                    </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <Button className="bg-green-500 text-indigo-50" variant="default">
                    Save to Excel
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-5">
          <Table>
              <TableCaption>A list of all members purchases.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>UserName</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Discount ID</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                  <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Done
                        </label>
                  </TableCell>
                  <TableCell>john45</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>30/10/2024</TableCell>
                  <TableCell>christmas30</TableCell>
                  <TableCell>285$</TableCell>
                  <TableCell><a href="#" className="text-indigo-500">Details</a></TableCell>
                </TableRow>

                

              </TableBody>
            </Table>
          </div>
        </div>


      </div>

  );
}


export default MemberOrderHistory;
