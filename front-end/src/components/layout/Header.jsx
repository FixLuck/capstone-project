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
              <Link to={"/"} className="text-orange-500">Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/shoes"}>Product</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/terms"}>Terms And Conditions</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/privacy"}>Privacy Policy</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/faq"}>FAQ</Link>
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
