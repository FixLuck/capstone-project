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
  const userRole = user ? user.scope : null
  console.log(userRole);
  

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
          <DropdownMenuLabel>{name ? "Chào mừng, " + name : "Hồ sơ"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user && (userRole === "ROLE_ADMIN" || userRole === "ROLE_MANAGER") && (
            <div>
              <Link to={"/admin"}>
                <DropdownMenuItem className="cursor-pointer">
                  Quản trị viên
                </DropdownMenuItem>
              </Link>
            </div>
          )}
          {user ? (
            <div>
              <Link to={"/profile/me"}>
                <DropdownMenuItem className="cursor-pointer">
                  Hồ sơ
                </DropdownMenuItem>
              </Link>
              <Link to={"/order-history"}>
                <DropdownMenuItem className="cursor-pointer">
                  Lịch sử đơn hàng
                </DropdownMenuItem>
              </Link>
              <Link to={"/logout"} onClick={handleLogout}>
                <DropdownMenuItem className="cursor-pointer">
                  Đăng xuất
                </DropdownMenuItem>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <DropdownMenuItem className="cursor-pointer">
                  Đăng nhập
                </DropdownMenuItem>
              </Link>
              <Link to={"/register"}>
                <DropdownMenuItem className="cursor-pointer">
                  Đăng ký
                </DropdownMenuItem>
              </Link>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
