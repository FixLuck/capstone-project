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

export function DiscountManagement() {
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
    <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
      <div className="sm:col-span-2 sm:block hidden">
        <AdminAside />
      </div>
      <div className="sm:col-span-10">
        <h1 className="mt-5 text-lg" align="center">
          Discount Management
        </h1>

        <div className="mt-5">
          <div className="grid gap-4 sm:grid-cols-10 grid-cols-1">
            <div className="sm:col-span-5 mt-3">
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
              <div className="grid gap-4 sm:grid-cols-5 grid-cols-1">
                <div className="sm:col-span-2">
                  <div className="relative mt-1">
                    <ComboboxSortDiscount
                      as="div"
                      value={selectedOption}
                      onChange={handleSelection}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <Button className="bg-green-500 text-indigo-50" variant="default">
                    Save to Excel
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Table>
              <TableCaption>A list of your recent discounts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">Edit</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Start Day</TableHead>
                  <TableHead>End Day</TableHead>
                  <TableHead>Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Select onValueChange={handleSelection}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Edit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Action</SelectLabel>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="delete">Delete</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>30/10/2024</TableCell>
                  <TableCell>30/10/2025</TableCell>
                  <TableCell>
                    <Checkbox id="terms2" />
                    <label htmlFor="terms2" className="text-sm font-medium leading-none">
                      Still active
                    </label>
                  </TableCell>
                </TableRow>


                <TableRow>
                  <TableCell>
                    <Select onValueChange={handleSelection}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Edit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Action</SelectLabel>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="delete">Delete</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>30/10/2024</TableCell>
                  <TableCell>30/10/2025</TableCell>
                  <TableCell>
                    <Checkbox id="terms2" />
                    <label htmlFor="terms2" className="text-sm font-medium leading-none">
                      Still active
                    </label>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Select onValueChange={handleSelection}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Edit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Action</SelectLabel>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="delete">Delete</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>30/10/2024</TableCell>
                  <TableCell>30/10/2025</TableCell>
                  <TableCell>
                    <Checkbox id="terms2" />
                    <label htmlFor="terms2" className="text-sm font-medium leading-none">
                      Still active
                    </label>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Select onValueChange={handleSelection}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Edit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Action</SelectLabel>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="delete">Delete</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>30/10/2024</TableCell>
                  <TableCell>30/10/2025</TableCell>
                  <TableCell>
                    <Checkbox id="terms2" />
                    <label htmlFor="terms2" className="text-sm font-medium leading-none">
                      Still active
                    </label>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </div>
        </div>

        {/* Dialog for editing discount */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ display: 'none' }}>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle align="center">Edit Discount</DialogTitle>
            </DialogHeader>
            <form>
              <Label htmlFor="disId">Discount ID</Label>
              <Input id="disId" type="text" className="mb-2" />
              <Label htmlFor="disPer">Percentage</Label>
              <Input id="disPer" type="number" className="mb-2" />

              <Label htmlFor="disStart">Start date</Label>
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

              <Label htmlFor="disEnd">End date</Label>
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

              <div className="mt-5 gap-4 sm:flex">
                <Button className="bg-gray-500 text-indigo-50">Back</Button>
                <Button className="bg-green-500 text-indigo-50">Save</Button>
                <Button className="bg-red-500 text-indigo-50">Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
export default DiscountManagement;
