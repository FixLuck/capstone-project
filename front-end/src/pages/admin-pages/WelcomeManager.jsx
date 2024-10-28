import React, { useState } from "react";
import ManagerAside from "@/components/manager-com/ManagerAside";
import { Button } from "../../components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export function WelcomeManager() {
    return (
        <div className="grid gap-4 sm:grid-cols-12 grid-cols-1">
        <div className="sm:col-span-2 sm:block hidden">
          <ManagerAside />
        </div>
        <div className="sm:col-span-10">
          <h1 align="center">Welcome Manager</h1>
          <div><img src="https://images.unsplash.com/photo-1500648767791-00dcc9942cbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" /></div>
          </div>
      </div>
    );
}
export default WelcomeManager