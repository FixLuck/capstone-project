import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Card,

  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../index.css';


export function AdminAside() {
  return (
    <aside className="h-full">
      <Card className="card w-full h-full max-w-sm mx-auto bg-black p-0 focus:outline-none">


        <CardContent>
        <Link to={"/admin"}>
          <div className="mt-10">
          <h1 className="text-red-800 text-lg italic font-bold">SuperTeam</h1>
          </div>
        </Link>
          <div className="mt-5 text-emerald-50">Your role: <span className="text-red-400"> Admin</span></div>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-5 mb-12 text-emerald-50 hover:text-red-400 hover:text-lg transition-colors duration-200">
              My account
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 bg-white rounded-md shadow-lg transition-all duration-300">
              <DropdownMenuSeparator />
              <Link to="/admin/profile">
              <DropdownMenuItem className="p-2 hover:text-red-400 hover:text-lg transition-colors duration-200">Profile</DropdownMenuItem>
              </Link>
              <Link to="/logout">
              <DropdownMenuItem className="p-2  hover:text-red-400 hover:text-lg transition-colors duration-200">Log out</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="mt-12">
            <ul>
              <li className="mb-3">
                <Link to="/admin" className="hover:text-red-400 hover:text-lg text-emerald-50 transition-colors duration-200">
                  Chào mừng
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/admin/manage-shoes" className="hover:text-red-400 hover:text-lg text-emerald-50 transition-colors duration-200">
                  Quản lý giày
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/admin/discount-management" className="hover:text-red-400 hover:text-lg text-emerald-50 transition-colors duration-200">
                  Quản lý discount
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/admin/member-order-history" className="hover:text-red-400 hover:text-lg text-emerald-50 transition-colors duration-200">
                  Lịch sử mua hàng
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/admin/account-management" className="hover:text-red-400 hover:text-lg text-emerald-50 transition-colors duration-200">
                  Quản lý tài khoản
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/admin/revenue-stats" className="hover:text-red-400 hover:text-lg text-emerald-50 transition-colors duration-200">
                  Doanh thu
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/logout" className="hover:text-red-400 hover:text-lg text-emerald-50 transition-colors duration-200">
                  log out
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
