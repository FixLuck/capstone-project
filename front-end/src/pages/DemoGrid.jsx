import { Button } from "../components/ui/button";
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
import '../index.css';
export function DemoGrid() {
    return (
        //dang lam quen voi code grid bo cuc web (demo)
        //1) demo equal grid
        // neu de moi grid-cols-(so nao do) thi khi man hinh nho no van se hien so do vd: neu de 3 thi cho du man hinh nho co nao thi cx se co 3 cot (ko nen lm vay vi no se cuc lai qua nhiu khong ai muon vay) 
        // <div className="m-4 grid gap-4 sm:grid-cols-4">
        // <div className="min-h-[100px] rounded-lg shadow bg-pink-500"></div>
        // <div className="min-h-[100px] rounded-lg shadow bg-purple-700"></div>
        // <div className="min-h-[100px] rounded-lg shadow bg-teal-700"></div>
        // <div className="min-h-[100px] rounded-lg shadow bg-orange-700"></div>
        // </div>

//demo2) non equal grid
        <div className="m-4 grid gap-4 sm:grid-cols-12 grid-cols-1">
        <div className="min-h-[100px] rounded-lg shadow bg-pink-500 sm:col-span-2 sm:block hidden"></div>
        <div className="min-h-[100px] rounded-lg shadow bg-purple-700 sm:col-span-8"></div>
        <div className="min-h-[100px] rounded-lg shadow bg-purple-700 sm:col-span-2 sm:block hidden"></div>
        </div>
    );
  }
  
  export default DemoGrid;
  