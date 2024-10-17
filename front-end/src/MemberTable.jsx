  import * as React from "react"
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
  import { Checkbox } from "@/components/ui/checkbox";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
  function MemberTable() {
    return (
      <div>
        {/* Head */}
        <div className="flex justify-between items-center">
          {/* Pagination */}
          <div className="flex items-center space-x-1">
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
          {/* SearchBar và PrintButton */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-300 rounded-md h-10">
              <Button className="h-10 p-0">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </Button>
              <Input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="border-none h-10 pl-2" // Thêm padding bên trái để không bị chồng lên icon
              />
            </div>
            {/* PrintButton */}
            <Button className="bg-green-500 text-white hover:bg-green-600">
              Save to Excel
            </Button>
          </div>
        </div>
        {/* Table */}
        <h1 class="font-semibold text-blue-500">Bảng Quản Lí Member</h1>
        <Table> 
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Actions</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Member Password</TableHead>
              <TableHead>Member Phone</TableHead>
              <TableHead>Member Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
              <Select>
                <SelectTrigger className="gap-2">
                  <label><FontAwesomeIcon icon={faEdit} /></label>
                  <SelectValue placeholder = "|"/>
                </SelectTrigger>
                <SelectContent className="mt-1 w-[180px]"> {/* Thêm class mt-1 để tạo khoảng cách giữa SelectTrigger và SelectContent */}
                  <SelectGroup>
                    <SelectLabel>Actions</SelectLabel>
                    <SelectItem value="Edit">Edit</SelectItem>
                    <SelectItem value="Delete">Delete</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </TableCell>
              <TableCell>NV001</TableCell>
              <TableCell>anguyenvan1</TableCell>
              <TableHead>***********</TableHead>
              <TableCell>0123456789</TableCell> 
              <TableCell>anguyenvan@gmail.com</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell className="text-center"><Checkbox id="terms" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* RowSelect */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="1" value="1"/>
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
    );
  }

export default MemberTable;