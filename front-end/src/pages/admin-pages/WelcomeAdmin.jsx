import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatterToVND, formatDate } from "@/utils/formatter";
import { useEffect } from "react";
import api from "@/config/axios";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


export function WelcomeAdmin() {
  const [dailyReport, setDailyReport] = useState([]);
  const [topCustomer, setTopCustomer] = useState([]);
  const [inventoryStatus, setInventoryStatus] = useState([]);
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const response = await api.get("report/daily-report");
        setDailyReport(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDailyReport();

    const fetchTopCustomer = async () => {
      try {
        const response = await api.get("/report/top-customer");
        setTopCustomer(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopCustomer();

    const fetchInventoryStatus = async () => {
      try {
        const response = await api.get("/report/inventory-status");
        setInventoryStatus(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInventoryStatus();

    const fetchTopSeller = async () => {
      try {
        const response = await api.get("/report/top-seller");
        setTopSellers(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopSeller();
  }, []);

  console.log(inventoryStatus);
  console.log(topSellers);

  const getDayOfWeek = (time) => {
    const date = new Date(time);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  function StockStatus({ stock }) {
    if (stock > 50) {
      return <Badge className="bg-green-500">Còn trong kho</Badge>;
    } else if (stock > 20) {
      return <Badge className="bg-yellow-500">Giới hạn</Badge>;
    } else {
      return <Badge className="bg-red-500">Sắp hết hàng</Badge>;
    }
  }

  return (
    <div className="p-6 max-w-full h-screen mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Bảng quản lý
          </h2>
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-2 w-72">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="other">Khác</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-90">
                  Tổng doanh thu
                </CardTitle>
                <DollarSign className="h-4 w-4 text-zinc-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">
                  {formatterToVND.format(
                    dailyReport.reduce(
                      (total, item) => total + item.totalRevenue,
                      0
                    )
                  )}
                </div>
                <p className="text-xs text-zinc-500">trong tuần vừa qua</p>
              </CardContent>
            </Card>
            {/* <Card className="bg-white border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-900">
                  Subscriptions
                </CardTitle>
                <Users className="h-4 w-4 text-zinc-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">+2350</div>
                <p className="text-xs text-zinc-500">+180.1% from last month</p>
              </CardContent>
            </Card> */}
            <Card className="bg-white border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-900">
                  Đơn đã thanh toán
                </CardTitle>
                <CreditCard className="h-4 w-4 text-zinc-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">
                  {dailyReport.reduce(
                    (total, item) => total + item.totalOrders,
                    0
                  )}
                </div>
                <p className="text-xs text-zinc-500">trong tuần vừa qua</p>
              </CardContent>
            </Card>
            {/* <Card className="bg-white border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-900">
                  Active Now
                </CardTitle>
                <Activity className="h-4 w-4 text-zinc-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900">+573</div>
                <p className="text-xs text-zinc-500">+201 since last hour</p>
              </CardContent>
            </Card> */}
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-white border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900">Tổng quan</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer height={350}>
                  <BarChart data={dailyReport}>
                    <XAxis
                      dataKey="saleDate"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => getDayOfWeek(value)}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => formatterToVND.format(value)}
                    />
                    <Bar
                      dataKey="totalRevenue"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-black"
                    />  
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-white border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900">
                  Khách hàng thân thiết
                </CardTitle>
                <p className="text-sm text-zinc-500">
                  Số đơn đã đặt:{" "}
                  {topCustomer.reduce(
                    (total, item) => total + item.totalOrders,
                    0
                  )}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {topCustomer.map((customer, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback>
                          {customer.fullName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none text-zinc-900">
                          {customer.fullName}
                        </p>
                        <p className="text-sm text-zinc-500">
                          Tổng số đơn hàng: {customer.totalOrders}
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-zinc-900">
                        + {formatterToVND.format(customer.totalSpent)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="other">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card className="bg-white border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-900">
                  Trạn thái kho hàng
                </CardTitle>
                <Activity className="h-4 w-4 text-zinc-900" />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>
                    Trạng thái kho hiện tại tính tới{" "}
                    {new Date().toLocaleDateString()}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Tên</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Số lượng hiện tại</TableHead>
                      <TableHead className="text-right">Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryStatus.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.shoeName}
                        </TableCell>
                        <TableCell>{item.sizeNumber}</TableCell>
                        <TableCell>{item.currentStock}</TableCell>
                        <TableCell className="text-right">
                          <StockStatus stock={item.stockStatus} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="bg-white border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-900">
                  Doanh thu
                </CardTitle>
                <Users className="h-4 w-4 text-zinc-900" />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>
                    Top 5 sản phẩm theo tổng doanh thu
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Tên</TableHead>
                      <TableHead>Tổng số đơn hàng</TableHead>
                      <TableHead>Tổng số đơn vị đã bán</TableHead>
                      <TableHead className="text-right">Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSellers.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.shoeName}
                        </TableCell>
                        <TableCell>{item.totalOrders}</TableCell>
                        <TableCell>{item.totalUnitsSold}</TableCell>
                        <TableCell className="text-right">
                          {formatterToVND.format(item.totalRevenue)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default WelcomeAdmin;
