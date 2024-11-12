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

export function AdminAside() {
  return (
    <aside className="h-full">
      {/* Card without rounded corners */}
      <Card className="w-full h-full max-w-sm mx-auto bg-white p-6 shadow-md border border-gray-200 focus:outline-none rounded-none">
        <CardContent>
          {/* Logo and Title */}
          <Link to={"/admin"}>
            <div className="text-center mt-8 mb-4">
              <h1 className="text-red-600 text-4xl font-semibold tracking-wide transition-transform transform hover:scale-105">
                SuperTeam
              </h1>
            </div>
          </Link>

          {/* Role Information */}
          <div className="mt-4 text-gray-600 text-center">
            Role: <span className="text-red-500 font-semibold">Admin</span>
          </div>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-8 text-gray-700 hover:text-red-500 text-center w-full p-3 hover:bg-gray-100 transition duration-300">
              <FaUserCircle className="inline mr-2" /> My Account
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 bg-white shadow-md border border-gray-200 transition-all duration-300 rounded-none">
              <DropdownMenuSeparator />
              <Link to="/admin/profile">
                <DropdownMenuItem className="flex items-center p-3 hover:text-red-500 hover:scale-105 transition-transform duration-200">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center p-3 hover:text-red-500 hover:scale-105 transition-transform duration-200">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Navigation Links */}
          <nav className="mt-10 space-y-3">
            <ul>
              <li>
                <Link
                  to="/admin"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaHome /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/manage-shoes"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaShoePrints /> <span>Manage Shoes</span>

                </Link>
              </li>
              <li>
                <Link
                  to="/admin/discount-management"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaPercentage /> <span>Discount Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/member-order-history"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaHistory /> <span>Order History</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/account-management"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaUsers /> <span>Account Management</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/revenue-stats"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaChartLine /> <span>Revenue Stats</span>
                </Link>
              </li>
              <li className="mt-12">
                <Link
                  to="/logout"
                  className="flex items-center justify-start gap-3 text-gray-700 hover:text-red-500 p-4 rounded-none hover:bg-gray-100 transition duration-200 w-full"
                >
                  <FaSignOutAlt /> <span>Log out</span>
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
