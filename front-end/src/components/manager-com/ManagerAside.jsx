import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
import './index.css';

export function ManagerAside() {
  return (
    <aside className="w-64 h-screen">
      <Card className="card w-full h-full max-w-sm mx-auto bg-teal-500 p-5">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-5 text-emerald-50">logo here</div>
          <div className="mt-10 text-emerald-50">manager</div>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-5 mb-12 text-emerald-50 hover:bg-red-400 transition-colors duration-200">
              My account
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 bg-white rounded-md shadow-lg transition-all duration-300">
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 hover:bg-red-400 transition-colors duration-200">Profile</DropdownMenuItem>
              <DropdownMenuItem className="p-2 hover:bg-red-400 transition-colors duration-200">log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="mt-12">
            <ul>
              <li className="mb-3"><a href="#" className="hover:bg-red-400 text-emerald-50 transition-colors duration-200">chào mừng</a></li>
              <li className="mb-3"><a href="#" className="hover:bg-red-400 text-emerald-50 transition-colors duration-200">quản lý giày</a></li>
              <li className="mb-3"><a href="#" className="hover:bg-red-400 text-emerald-50 transition-colors duration-200">quản lý discount</a></li>
              <li className="mb-3"><a href="#" className="hover:bg-red-400 text-emerald-50 transition-colors duration-200">lịch sử mua hàng</a></li>
            </ul>
          </nav>
        </CardContent>
        <CardFooter>
          <nav>
            <ul>
              <li className="mt-10"><a href="#" className="hover:bg-red-400 text-emerald-50 transition-colors duration-200">log out</a></li>
            </ul>
          </nav>
        </CardFooter>
      </Card>
    </aside>
  );
}

export default ManagerAside;
