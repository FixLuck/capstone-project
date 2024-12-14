import React, { useCallback } from "react";
import api from "@/config/axios";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoIosSearch } from "react-icons/io";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BiSolidDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import ComboBoxOrderBy from "../../components/shop/ComboBoxOrderBy";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterOptions } from "@/store/filter";
import { useShopFilters } from "@/hooks/useShopFilters";
import { cartActions } from "@/store";
import { ToastContainer, toast } from "react-toastify";
import { formatterToVND } from "../../utils/formatter";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { FaHome } from "react-icons/fa";

export default function ListShoePage() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevFilters, setPrevFilters] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const itemsPerPage = 8;

  const filteredShoe = shoes.filter((shoe) => {
    return shoe.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedShoes = [...filteredShoe].sort((a, b) => {
    sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const indexOfLastShoe = currentPage * itemsPerPage;
  const indexOfFirstShoe = indexOfLastShoe - itemsPerPage;
  const currentShoes = sortedShoes.slice(indexOfFirstShoe, indexOfLastShoe);

  const totalPages = Math.ceil(sortedShoes.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (shoe) => {
    const size =
      shoe.variants && shoe.variants[0] && shoe.variants[0].size
        ? shoe.variants[0].size // If size is directly available
        : shoe.variants && shoe.variants[0] && shoe.variants[0].sku
        ? shoe.variants[0].sku.split("-").pop() // If size is in SKU
        : "6";

    const itemToAdd = {
      productId: shoe.id,
      price: shoe.price,
      imageUrl: shoe.images[0].url,
      variantId: shoe.variants[0].id,
      size: size,
      name: shoe.name,
    };

    dispatch(cartActions.addItemToCart(itemToAdd));
    console.log(itemToAdd);
    localStorage.setItem("cartItems", JSON.stringify(itemToAdd));

    toast.success("Item added to cart", {
      autoClose: 2000,
    });
  };

  const dispatch = useDispatch();
  const {
    brands,
    categories,
    genders,
    loading: filtersLoading,
  } = useSelector((state) => state.filter);

  const { filters, updateFilter, clearFilters } = useShopFilters();

  useEffect(() => {
    if (!brands.length || !categories.length || !genders.length) {
      dispatch(fetchFilterOptions());
    }
  }, [dispatch, brands.length, categories.length, genders.length]);

  const fetchShoes = async () => {
    setLoading(true);
    try {
      let endpoint = "/shoes";
      if (filters.category) {
        endpoint = "/shoes/by-category";
      } else if (filters.brand) {
        endpoint = "/shoes/by-brand";
      } else if (filters.gender) {
        endpoint = "/shoes/by-gender";
      }

      const { data } = await api.get(endpoint, { params: filters });
      setShoes(data.result);
      setPrevFilters(filters);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      fetchShoes();
      return;
    }

    if (JSON.stringify(prevFilters) !== JSON.stringify(filters)) {
      fetchShoes();
    }
  }, [filters]);

  return (
    <main className="container mx-auto bg-white rounded-sm">
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/"><FaHome /></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shoes">Sản phẩm</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex p-4">
        <div className="w-1/3 me-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Hãng giày</AccordionTrigger>
              {brands.map((brand, index) => (
                <AccordionContent key={index}>
                  <Link
                    to={`/shoes?brand=${brand.brandId}`}
                    className="hover:underline"
                  >
                    {brand.brandName}
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Loại giày</AccordionTrigger>
              {categories.map((category, index) => (
                <AccordionContent key={index}>
                  <Link
                    to={`/shoes?category=${category.value}`}
                    className="hover:underline"
                  >
                    {category.name}
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Giới tính</AccordionTrigger>
              {genders.map((gender, index) => (
                <AccordionContent key={index}>
                  <Link
                    to={`/shoes?gender=${gender.value}`}
                    className="hover:underline"
                  >
                    {gender.name}
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex-col">
          <div className="mb-8 mt-4 flex justify-between">
            <div className="relative w-1/3 flex">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
                placeholder="Tìm kiếm..."
              />
            </div>
            {/* <div>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Price: Low to High</SelectItem>
                  <SelectItem value="desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentShoes.map((shoe) => (
              <Card
                key={shoe.id}
                className="hover:border-stone-950 cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="capitalize">{shoe.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={shoe.images[0].url} alt="" />
                  <div className="flex justify-between">
                    <p className="text-xl font-bold mt-2">
                      {formatterToVND.format(shoe.price)}
                    </p>
                    <p className="text-xl font-bold mt-2 line-through">
                      {formatterToVND.format(shoe.fakePrice)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Link to={`/shoes/${shoe.id}`}>
                    <Button className="cursor-pointer hover:bg-slate-500 hover:text-slate-950">
                      <BiSolidDetail className="w-6 h-6" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="cursor-pointer hover:text-stone-950"
                    onClick={() => handleAddToCart(shoe)}
                  >
                    <FiShoppingBag className="w-6 h-6" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-between items-center my-4">
            <div>
              Hiện trang {indexOfFirstShoe + 1} trên{" "}
              {Math.min(indexOfLastShoe, sortedShoes.length)} từ{" "}
              {sortedShoes.length} giày
            </div>
            <div className="flex spacex-x-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
