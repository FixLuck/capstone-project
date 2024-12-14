import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaShoePrints,
  FaPercentage,
  FaHistory,
  FaUsers,
  FaChartLine,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store";
import { selectUser } from "@/store/auth";

export function AdminAside() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const name = user ? user.sub : null;
  const userRole = user ? user.scope : null;

  function removeRolePrefix(role) {
    return role.slice(5);
  }

  const cleanRole = userRole ? removeRolePrefix(userRole) : null;

  return (
    <aside className="h-full">
      {/* Card without rounded corners */}
      <Card className="w-full h-full max-w-sm mx-auto bg-white p-6 shadow-md border border-gray-200 focus:outline-none rounded-none">
        <CardContent>
          {/* Logo and Title */}
          <Link to={"/"}>
            <div className="text-center mt-8 mb-4">
              <h1 className="text-red-600 text-4xl font-semibold tracking-wide transition-transform transform hover:scale-105">
                SuperTeam
              </h1>
            </div>
          </Link>

          {/* Role Information */}
          <div className="mt-4 text-gray-600 text-center">
            Xin chào:{" "}
            <span className="text-red-500 font-semibold">
              {name} ({cleanRole})
            </span>
          </div>
          {/* Navigation Links */}
          <nav className="mt-10 space-y-3">
            <ul>
              <li>
                <Link
                  to="/admin"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaHome /> <span>Bảng điều khiển</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/manage-shoes"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaShoePrints /> <span>Quản lý giày</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/discount-management"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaPercentage /> <span>Quản lý mã giảm giá</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/member-order-history"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaHistory /> <span>Lịch sử đơn hàng</span>
                </Link>
              </li>
              {user && userRole === "ROLE_ADMIN" && (
                <div>
                  <li>
                    <Link
                      to="/admin/account-management"
                      className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                    >
                      <FaUsers /> <span>Quản lý tài khoản</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/revenue-stats"
                      className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                    >
                      <FaChartLine /> <span>Thống kê doanh thu</span>
                    </Link>
                  </li>
                </div>
              )}
              <li className="mt-12">
                <Link
                  onClick={() => dispatch(authActions.logout())}
                  to="/logout"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaSignOutAlt /> <span>Đăng xuất</span>
                </Link>
              </li>
            </ul>
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}

export default AdminAside;
