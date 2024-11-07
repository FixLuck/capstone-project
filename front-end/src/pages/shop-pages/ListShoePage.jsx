import React from "react";
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
import { Button } from "@/components/ui/button";
import { BiSolidDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import ComboBoxOrderBy from "../../components/shop/ComboBoxOrderBy";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterOptions } from "@/store/filter";
import { useShopFilters } from "@/hooks/useShopFilters";

export default function ListShoePage() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevFilters, setPrevFilters] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

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
      let endpoint = "shoes";
      if (filters.category) {
        endpoint = "shoes/by-category";
      } else if (filters.brand) {
        endpoint = "shoes/by-brand";
      } else if (filters.gender) {
        endpoint = "shoes/by-gender";
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
      <div className="flex p-4">
        <div className="w-1/3 me-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Brand</AccordionTrigger>
              {brands.map((brand) => (
                <AccordionContent key={brand.id}>
                  <Link to={`/shoes?brand=${brand.brandId}`} className="hover:underline">
                    {brand.brandName}
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Category</AccordionTrigger>
              {categories.map((category, index) => (
                <AccordionContent key={index}>
                  <Link to={`/shoes?category=${category.value}`} className="hover:underline">
                    {category.name}
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Gender</AccordionTrigger>
              {genders.map((gender, index) => (
                <AccordionContent key={index}>
                  <Link to={`/shoes?gender=${gender.value}`} className="hover:underline"  >
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
              <Input placeholder="Search" />
              <Button
                variant="ghost"
                className="absolute right-1 hover:bg-stone-950 hover:text-stone-200"
              >
                <IoIosSearch className="w-6 h-6" />
              </Button>
            </div>
            <div>
              <ComboBoxOrderBy />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shoes.map((shoe) => (
              <Card
                key={shoe.id}
                className="hover:border-stone-950 cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="capitalize">{shoe.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={shoe.images[0].url} alt="" />
                  <p className="text-xl font-bold mt-2">{shoe.price}.000 đ</p>
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
                  >
                    <FiShoppingBag className="w-6 h-6" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
