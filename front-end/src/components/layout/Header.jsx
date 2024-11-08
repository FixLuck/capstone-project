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
              <NavigationMenuTrigger className="text-orange-500">
                Shop
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex gap-12 flex-wrap">
                  
                  {/* Brand Column */}
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg">Brand</h3>
                    <Link to={"/shoes/brand/nike"} className="text-gray-500 hover:text-black">Nike</Link>
                    <Link to={"/shoes/brand/adidas"} className="text-gray-500 hover:text-black">Adidas</Link>
                    <Link to={"/shoes/brand/puma"} className="text-gray-500 hover:text-black">Puma</Link>
                    <Link to={"/shoes/brand/reebok"} className="text-gray-500 hover:text-black">Reebok</Link>
                  </div>
                  
                  {/* Category Column */}
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg">Category</h3>
                    <Link to={"/shoes/category/running"} className="text-gray-500 hover:text-black">Running</Link>
                    <Link to={"/shoes/category/casual"} className="text-gray-500 hover:text-black">Casual</Link>
                    <Link to={"/shoes/category/sport"} className="text-gray-500 hover:text-black">Sport</Link>
                  </div>
                  
                  {/* Gender Column */}
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg">Gender</h3>
                    <Link to={"/shoes/gender/men"} className="text-gray-500 hover:text-black">Men</Link>
                    <Link to={"/shoes/gender/women"} className="text-gray-500 hover:text-black">Women</Link>
                    <Link to={"/shoes/gender/unisex"} className="text-gray-500 hover:text-black">Unisex</Link>
                  </div>
                  
                  {/* Size Column */}
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg">Size</h3>
                    <Link to={"/shoes/size/6"} className="text-gray-500 hover:text-black">US 6</Link>
                    <Link to={"/shoes/size/7"} className="text-gray-500 hover:text-black">US 7</Link>
                    <Link to={"/shoes/size/8"} className="text-gray-500 hover:text-black">US 8</Link>
                    <Link to={"/shoes/size/9"} className="text-gray-500 hover:text-black">US 9</Link>
                    <Link to={"/shoes/size/10"} className="text-gray-500 hover:text-black">US 10</Link>
                    <Link to={"/shoes/size/11"} className="text-gray-500 hover:text-black">US 11</Link>
                    <Link to={"/shoes/size/12"} className="text-gray-500 hover:text-black">US 12</Link>
                    <Link to={"/shoes/size/13"} className="text-gray-500 hover:text-black">US 13</Link>
                    <Link to={"/shoes/size/14"} className="text-gray-500 hover:text-black">US 14</Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to={"/shipping"}>Shipping And Returns</Link>
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
<<<<<<< HEAD
          <Link to={"/cart"}>
            <ShoppingBag />
          </Link>

=======
          <Link to={"/cart"}><ShoppingBag /></Link> 
>>>>>>> 89b8a85574dfdb7c503c56af9abf89b338389ee5
        </div>
      </div>
    </header>
  );
}
