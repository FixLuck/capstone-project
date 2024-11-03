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


export function WelcomeAdmin() {
    return (
      <div className="grid sm:grid-cols-12 grid-cols-1 h-screen bg-white">
        {/* Sidebar */}
        <div className="sm:col-span-2 sm:block hidden h-full">
          <AdminAside />
        </div>

        {/* Main content */}
        <div className="sm:col-span-10 h-full">
          <h1 align="center" className="mt-5">Welcome Admin</h1>

          {/* Welcome Image */}
          <div className="flex items-center justify-center h-full">
            <img className="mt-5 w-full" src="public/admin-images/welcome.png" alt="Welcome" />
          </div>
        </div>
      </div>
    );
}

export default WelcomeAdmin;
