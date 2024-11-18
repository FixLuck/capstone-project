import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderDropDown() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>Mở menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
          <DropdownMenuItem>Hóa đơn</DropdownMenuItem>
          <DropdownMenuItem>Nhóm</DropdownMenuItem>
          <DropdownMenuItem>Gói đăng ký</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
