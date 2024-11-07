import React from "react";
import { Link } from "react-router-dom";
import UserDropDown from "../shop/UserDropDown";
import ShoppingBag from "../shop/ShoppingBag";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow">
      <div className="container flex items-center justify-between mx-auto gap-5 h-24">
        <Link to={"/"}>
          <h1 className="text-red-800 text-4xl italic font-bold">SuperTeam</h1>
        </Link>
        <div className="hidden lg:flex gap-12 justify-between">
          <Link to={"/"}>Home</Link>
          <Link to={"/shoes"}>Products</Link>
          <Link to={"/add-shoe"}>Add Shoe</Link>
          <Link to={"/users"}>Users</Link>
          <Link to={"/posts"}>Posts</Link>
        </div>
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
