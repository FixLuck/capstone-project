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
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Shoe ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Edit</TableHead>
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
              <TableCell>{shoe.price}</TableCell>
              <TableCell className="text-right space-x-2">
                <UpdateShoeForm shoeId={shoe.id} />
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
