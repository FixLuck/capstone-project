import React from 'react'
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { CircleUser } from 'lucide-react';

export default function UserDropDown() {
  return (
    <div className='cursor-pointer'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <CircleUser className='w-8 h-8'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-translate-x-1/3">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={"/login"}><DropdownMenuItem className='cursor-pointer'>Login</DropdownMenuItem></Link>
          <Link to={"/register"}><DropdownMenuItem className='cursor-pointer'>Register</DropdownMenuItem></Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
