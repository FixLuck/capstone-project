import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; // We'll use axios for HTTP requests
import api from "@/config/axios";

// You'll need to install and import your UI components library
// For this example, I'll assume we're using a hypothetical 'react-ui-library'
// import { Input, Button, Select, Table } from 'react-ui-library'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, TableCellsMerge } from "lucide-react";
import { formatterToVND } from "@/utils/formatter";
import UpdateShoeForm from "../admin-pages/UpdateShoeForm";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const ShoeManagement = () => {
  const [shoeData, setShoeData] = useState(null);
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const fetchShoeData = useCallback(async () => {
    try {
      const params = {
        name,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        brandId: brandId || undefined,
        gender: gender || undefined,
        category: category || undefined,
        sortOrder,
        page,
        size,
      };

      const response = await api.get("shoes/list-shoes", { params });
      setShoeData(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching shoe data:", error);
    }
  }, [
    name,
    minPrice,
    maxPrice,
    brandId,
    gender,
    category,
    sortOrder,
    page,
    size,
  ]);

  useEffect(() => {
    fetchShoeData();
  }, [fetchShoeData, name, minPrice, maxPrice, brandId, gender, category, sortOrder, page, size]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1);
    fetchShoeData();
  };

  if (!shoeData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Shoe Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : null)
              }
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
        </div>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger>
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MAN">Nam</SelectItem>
            <SelectItem value="WOMAN">Nữ</SelectItem>
            <SelectItem value="UNISEX">Unisex</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SPORT">SPORT</SelectItem>
            <SelectItem value="RUNNING">RUNNING</SelectItem>
            <SelectItem value="CASUAL">CASUAL</SelectItem>
          </SelectContent>
        </Select>
        <Select value={brandId} onValueChange={setBrandId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Nike</SelectItem>
            <SelectItem value="2">Adidas</SelectItem>
            <SelectItem value="3">Puma</SelectItem>
            <SelectItem value="4">Reebok</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
            <SelectItem value="asc">Price: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSearch} className="w-full md:w-auto">
        Search
      </Button>
      <Button variant="outline" className="hover:bg-green-600 hover:text-white">
        <Link to={"/admin/manage-shoes/new"} className="flex p-4 align-items-center">
          <IoIosAddCircleOutline className="mr-2 h-10 w-10" />
          <span>Add</span>
        </Link>
      </Button>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Control</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shoeData.data.map((shoe) => (
              <TableRow key={shoe.id}>
                <TableCell className="font-medium">{shoe.name}</TableCell>
                <TableCell>
                  <img
                    src={shoe.images[0].url}
                    alt={shoe.name}
                    className="h-20 w-20 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{formatterToVND.format(shoe.price)}</TableCell>
                <TableCell>
                  {shoe.variants.reduce(
                    (total, variant) => total + variant.stockQuantity,
                    0
                  )}
                </TableCell>
                <TableCell>
                    <UpdateShoeForm shoeId={shoe.id} />
                    <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Showing page {shoeData.currentPage} of {shoeData.totalPages} (Total
          items: {shoeData.totalElements})
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(shoeData.currentPage - 1)}
            disabled={shoeData.currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: shoeData.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                variant={
                  shoeData.currentPage === pageNum ? "default" : "outline"
                }
                size="sm"
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(shoeData.currentPage + 1)}
            disabled={shoeData.currentPage === shoeData.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoeManagement;
