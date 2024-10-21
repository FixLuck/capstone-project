import React, { useState } from "react";
import ManagerAside from "@/components/manager-com/ManagerAside";
import { Button } from "@/components/ui/button";
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
        <div className="sm:col-span-10"><h1>Welcome Manager</h1></div>
      </div>
    );
}
export default WelcomeManager