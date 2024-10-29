import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminAside from './components/admin-com/AdminAside.jsx';
import { ComboboxSortRevenue } from "@/components/ui/combobox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function RevenueStatistics() {
    const [selectedOption, setSelectedOption] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const options = ["High to low", "Low to high", "Newest", "Oldest"];
    
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
    <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
      <div className="sm:col-span-2 sm:block hidden">
        <AdminAside />
      </div>
        <div className="sm:col-span-10">
        <h1 className="mt-5 text-lg text-black-500 font-bold" align="center">
            Revenue Statistics
        </h1>
        <div className="mt-5">
          {/* Head */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
                <div className="relative mt-1">
                    <ComboboxSortRevenue
                      as="div"
                      value={selectedOption}
                      onChange={handleSelection}
                    />
                </div>
            </div>
            {/* SearchBar và PrintButton */}
            {/* SearchBar */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center h-10">
                <Label className="m-2" htmlFor="revStart">Start Day</Label>
                <Popover id="revStart" className="mb-2">
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

                <Label className="m-2" htmlFor="revEnd">End Day</Label>
                <Popover id="revEnd" className="mb-2">
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
              {/* PrintButton */}
              <Button className="bg-green-500 text-white hover:bg-green-600">
                Save to Excel
              </Button>
            </div>
          </div>
          <div className="mt-5">
            {/* Table */}
            <Table> 
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center font-bold">Date</TableHead>
                  <TableHead className="text-center font-bold">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-center">
                  <TableCell>01/12/2023</TableCell>
                  <TableCell>8.000.000 VND</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-5">
            {/* Placeholder to center pagination */}
            <div className="flex-grow text-center">
                {/* This will center the pagination */}
                <div className="flex justify-center items-center space-x-2">
                <Button className="hidden h-8 w-8 p-0 lg:flex">
                    <span className="sr-only">Go to first page</span>
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                </Button>
                <Button className="h-8 w-8 p-0">
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="flex w-[80px] justify-center border-2 rounded-lg p-1 text-sm font-medium">
                    Page 1/1
                </div>
                <Button className="h-8 w-8 p-0">
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button className="hidden h-8 w-8 p-0 lg:flex">
                    <span className="sr-only">Go to last page</span>
                    <DoubleArrowRightIcon className="h-4 w-4" />
                </Button>
                </div>
            </div>
                        {/* Rows per page section on the left */}
                        <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select>
                <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder="1" value="1" />
                </SelectTrigger>
                <SelectContent side="top">
                    {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
           </div>
        </div>
        {/* Dialog for editing discount */}
      </div>
    </div>
  );
}

export default RevenueStatistics;