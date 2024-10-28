import React, { useState } from "react";
import { Button } from "../../components/ui/button";


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminAside from "@/components/admin-com/AdminAside";
import '../../index.css';
import { Import } from "lucide-react";
// import { Outlet } from "react-router-dom";


export function WelcomeAdmin() {
    return (
      <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
      <div className="sm:col-span-2 sm:block hidden">
        {/* <AdminAside /> */}
      </div>
      <div className="sm:col-span-10 mt-5">
        <h1 align="center">Welcome Manager</h1>
        <div><img src="https://images.unsplash.com/photo-1500648767791-00dcc9942cbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" /></div>
        </div>

    </div>
    );
}
export default WelcomeAdmin

