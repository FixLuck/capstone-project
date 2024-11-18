import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaShoePrints,
  FaPercentage,
  FaHistory,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa"; // Importing icons
import "../../index.css";

export function ManagerAside() {
  return (
    <aside className="h-full">
      {/* Card with a white background and border */}
      <Card className="w-full h-full max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 focus:outline-none">
        <CardContent>
          {/* Logo and Title */}
          <Link to={"/manager"}>
            <div className="text-center mt-8 mb-4">
              <h1 className="text-red-600 text-4xl font-semibold tracking-wide transition-transform transform hover:scale-110 hover:opacity-80">
                SuperTeam
              </h1>
            </div>
          </Link>

          {/* Role Information */}
          <div className="mt-4 text-gray-600 text-center">
            Vai trò: <span className="text-red-500 font-semibold">Quản lý (manager)</span>
          </div>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-8 text-gray-700 hover:text-red-500 text-center w-full p-3 rounded-lg hover:bg-gray-100 transition duration-300">
              <FaUserCircle className="inline mr-2" /> Tài khoản của tôi
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-300">
              <DropdownMenuSeparator />
              <Link to="/manager/profile">
                <DropdownMenuItem className="flex items-center p-3 hover:text-red-500 hover:scale-105 transition-transform duration-200">
                  Hồ sơ
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center p-3 hover:text-red-500 hover:scale-105 transition-transform duration-200">
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Navigation Links */}
          <nav className="mt-10 space-y-4">
            <ul>
              <li>
                <Link
                  to="/manager"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-lg hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaHome className="text-lg" /> <span>Bảng điều khiển</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/manage-shoes"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-lg hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaShoePrints className="text-lg" /> <span>Quản lý giày</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/discount-management"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-lg hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaPercentage className="text-lg" /> <span>Quản lý giảm giá</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/member-order-history"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-lg hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaHistory className="text-lg" /> <span>Lịch sử đơn hàng</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Log out Link */}
          <nav className="mt-12">
            <ul>
              <li>
                <Link
                  to="/logout"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-lg hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaSignOutAlt className="text-lg" /> <span>Đăng xuất</span>
                </Link>
              </li>
            </ul>
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}

export default ManagerAside;
