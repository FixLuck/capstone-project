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
  import { IoIosAddCircleOutline } from "react-icons/io";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Checkbox } from "@/components/ui/checkbox";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faEdit } from '@fortawesome/free-solid-svg-icons';
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
  import { useEffect } from "react";
  import api from "@/config/axios";
  import { Link } from "react-router-dom";
  import UpdateMemberForm from "./UpdateMemberForm";


 export function MemberManagemant() {
    const [selectedOption, setSelectedOption] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleSelection = (value) => {
      setSelectedOption(value);
  
      // Open the dialog if 'edit' is selected
      if (value === "Edit") {
        setIsDialogOpen(true);
      }
    };
    const [users, setUsers] = React.useState([]);
    useEffect(() => {
      const fetchUsers = async () => {
        const { data } = await api.get("users");
        setUsers(data.result);
      };
  
      fetchUsers();
    }, []);
    return (

          <div >
          <h1 className="mt-5 text-lg text-black-500 font-bold" align="center">
            Member Management
          </h1>
       
          <div className="mt-5">
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
              {/* SearchBar */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 rounded-md h-10">
                  <Button className="h-10 p-1">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="border-none h-10 pl-2"
                  />
                </div>

              </div>
            </div>
            <div className="mt-5">
              {/* Table */}
              <Table> 
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Actions</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Member Phone</TableHead>
                    <TableHead>Member Email</TableHead>
                    <TableHead>Member Address</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-left space-x-2">
                    <UpdateMemberForm userId={user.id} />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.phone}</TableCell> 
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                   ))}
                </TableBody>
              </Table>
            </div>
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
         
        </div>
    );
  }

export default MemberManagemant;