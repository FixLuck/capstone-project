import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect } from "react";
import api from "@/config/axios";
import { Button } from "@/components/ui/button";
import UpdateShoeForm from "./UpdateShoeForm";
import { Link } from "react-router-dom";
import { formatterToVND } from "@/utils/formatter";

import { IoIosAddCircleOutline } from "react-icons/io";

export default function ShoeList() {
  const [shoes, setShoes] = React.useState([]);

  useEffect(() => {
    const fetchShoes = async () => {
      const { data } = await api.get("shoes");
      setShoes(data.result);
    };

    fetchShoes();
  }, []);

  return (
    <div>
      <Button variant="outline" className="hover:bg-green-600 hover:text-white">
        <Link to={"/admin/manage-shoes/new"} className="flex p-4 align-items-center">
          <IoIosAddCircleOutline className="mr-2 h-10 w-10" />
          <span>Thêm</span>
        </Link>
      </Button>

      <Table>
        <TableCaption>Danh sách giày gần đây.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID giày</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead></TableHead>
            <TableHead>Giá</TableHead>
            <TableHead className="text-right">Chỉnh sửa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shoes.map((shoe, index) => (
            <TableRow key={shoe.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{shoe.name}</TableCell>
              <TableCell>
                <img src={shoe.images[0].url} alt="" className="h-20 w-20" />
              </TableCell>
              <TableCell>{formatterToVND.format(shoe.price)}</TableCell>
              <TableCell className="text-right space-x-2">
                <UpdateShoeForm shoeId={shoe.id} />
                <Button variant="destructive">Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
