import React from "react";
import { Link } from "react-router-dom";
import UserDropDown from "../shop/UserDropDown";
import ShoppingBag from "../shop/ShoppingBag";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow">
      <div className="container flex items-center justify-between mx-auto gap-5 h-24">
        <Link to={"/"}>
          <h1 className="text-red-800 text-4xl italic font-bold">SuperTeam</h1>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList className="hidden lg:flex gap-6">
            <NavigationMenuItem>
              <Link to={"/"} className="text-orange-500">Trang chủ</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/shoes"}>Sản phẩm</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/terms"}>Điều khoản và điều kiện</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/privacy"}>Chính sách bảo mật</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/faq"}>Câu hỏi thường gặp</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>
        
        <div className="flex gap-5">
          <UserDropDown />
          <Link to={"/cart"}>
            <ShoppingBag />
          </Link>
        </div>
      </div>
    </header>
  );
}
