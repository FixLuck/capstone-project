import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatterToVND, formatDate } from "@/utils/formatter";
import { useEffect } from "react";
import api from "@/config/axios";
import { useState } from "react";

const data = [
  { name: "Jan", total: 4200 },
  { name: "Feb", total: 4800 },
  { name: "Mar", total: 2900 },
  { name: "Apr", total: 4800 },
  { name: "May", total: 2400 },
  { name: "Jun", total: 4000 },
  { name: "Jul", total: 2800 },
  { name: "Aug", total: 2000 },
  { name: "Sep", total: 3800 },
  { name: "Oct", total: 2400 },
  { name: "Nov", total: 4200 },
  { name: "Dec", total: 2300 },
];

export function WelcomeAdmin() {
  const [dailyReport, setDailyReport] = useState([]);
  const [topCustomer, setTopCustomer] = useState([]);


  


  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const response = await api.get('report/daily-report');
        setDailyReport(response.data.result);
        
    } catch (error) {
        console.error(error);
      }
    };
    fetchDailyReport();

    const fetchTopCustomer = async () => {
      try {
        const response = await api.get('report/top-customer');
        setTopCustomer(response.data.result);
        
    } catch (error) {
        console.error(error);
      }
    };
    fetchTopCustomer();

  }, [])

  const getDayOfWeek = (time) => {
    const date = new Date(time);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }




  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-black min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Dasboard
          </h2>
          <div className="hidden md:flex space-x-2 text-sm text-zinc-600">
            <button className="text-white">Overview</button>
            <button>Analytics</button>
            <button>Reports</button>
            <button>Notifications</button>
          </div>
        </div>
      </div>
      <Tabs>
        <TabsList className="grid grid-cols-2 w-72">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Tổng doanh thu
                </CardTitle>
                <DollarSign className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatterToVND.format(dailyReport.reduce((total, item) => total + item.totalRevenue, 0))}</div>
                <p className="text-xs text-zinc-500">trong tuần vừa qua</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Subscriptions
                </CardTitle>
                <Users className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">+2350</div>
                <p className="text-xs text-zinc-500">+180.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Đơn đã thanh toán
                </CardTitle>
                <CreditCard className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{dailyReport.reduce((total, item) => total + item.totalOrders, 0)}</div>
                <p className="text-xs text-zinc-500">trong tuần vừa qua</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  Active Now
                </CardTitle>
                <Activity className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">+573</div>
                <p className="text-xs text-zinc-500">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-zinc-950 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Overview</CardTitle>
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
                      className="fill-white"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-zinc-950 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Khách hàng thân thiết</CardTitle>
                <p className="text-sm text-zinc-500">
                  Số đơn đã đặt: {topCustomer.reduce((total, item) => total + item.totalOrders, 0)}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {topCustomer.map((customer) => (
                    <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>{customer.fullName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {customer.fullName}
                      </p>
                      <p className="text-sm text-zinc-500">
                        Tổng số đơn hàng: {customer.totalOrders}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-white">
                      + {formatterToVND.format(customer.totalSpent)}
                    </div>
                  </div>))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default WelcomeAdmin;
