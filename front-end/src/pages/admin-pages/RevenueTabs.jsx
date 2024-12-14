import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import api from "@/config/axios";
import { formatterToVND } from "@/utils/formatter";

const dateRangeData = [
  { date: "2023-01-01", revenue: 1000 },
  { date: "2023-01-02", revenue: 1200 },
  { date: "2023-01-03", revenue: 900 },
  { date: "2023-01-04", revenue: 1500 },
  { date: "2023-01-05", revenue: 2000 },
];

const monthlyData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 7500 },
  { month: "Apr", revenue: 8000 },
  { month: "May", revenue: 9000 },
  { month: "Jun", revenue: 10000 },
];

export default function RevenueTabs() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [dailyTotal, setDailyTotals] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState([]);

  useEffect(() => {
    const fetchDailyTotal = async () => {
      try {
        const response = await api.get(
          `/report/daily-totals?startDate=${startDate}&endDate=${endDate}`
        );
        setDailyTotals(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDailyTotal();

    const fetchMonthlyTotal = async () => {
      try {
        const response = await api.get(
          `/report/monthly-totals?year=${selectedYear}`
        );
        console.log(response.data.result);

        setMonthlyTotal(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthlyTotal();
  }, [startDate, endDate, selectedYear]);

  return (
    <Tabs defaultValue="date-range" className="max-w-full h-screen mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="date-range">Doanh Thu Theo Khoảng Thời Gian</TabsTrigger>
        <TabsTrigger value="monthly">Theo tháng</TabsTrigger>
      </TabsList>
      <TabsContent value="date-range">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu theo khoảng thời gian</CardTitle>
            <CardDescription>
              Xem doanh thu theo khoảng thời gian cụ thể
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Ngày bắt đầu</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">Ngày kết thúc</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyTotal}>
                <XAxis dataKey="orderDate" />
                <YAxis
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatterToVND.format(value)}
                />
                <Bar dataKey="dailyTotal" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="monthly">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu hằng tháng</CardTitle>
            <CardDescription>
              Xem doanh thu theo năm cụ thể
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-[200px]">
              <Label htmlFor="year-select">Chọn năm</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year-select">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTotal}>
                <XAxis dataKey="month" />
                <YAxis
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatterToVND.format(value)}
                />
                <Bar dataKey="monthlyTotal" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
