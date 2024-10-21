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
      <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
      <div className="sm:col-span-2 sm:block hidden">
        <AdminAside />
      </div>
      <div className="sm:col-span-10"><h1>Welcome Manager</h1></div>
    </div>
    );
}
export default WelcomeAdmin

