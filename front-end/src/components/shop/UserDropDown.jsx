import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/auth"
import { authActions } from "../../store";



export default function UserDropDown() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const name = user ? user.sub : null;
  console.log(name);


  

  const handleLogout = () => {
    dispatch(authActions.logout());
  }
 
  

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CircleUser className="w-8 h-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-translate-x-1/3">
          <DropdownMenuLabel>{name ? "Welcome, " + name : "Profile"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user ? (
            <div>
              <Link to={"/profile/me"}>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link to={"/orders"}>
                <DropdownMenuItem className="cursor-pointer">
                  Orders History
                </DropdownMenuItem>
              </Link>
              <Link to={"/logout"} onClick={handleLogout}>
                <DropdownMenuItem className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <DropdownMenuItem className="cursor-pointer">
                  Login
                </DropdownMenuItem>
              </Link>
              <Link to={"/register"}>
                <DropdownMenuItem className="cursor-pointer">
                  Register
                </DropdownMenuItem>
              </Link>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
