import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFilterOptions } from "@/store/filter";
import { useEffect } from "react";
import { useFormField } from "../ui/form";


export default function ListBrand() {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white my-4 py-4 rounded-sm">
      <div className="text-3xl text-center font-semibold underline underline-offset-8 mb-16">
        Chọn hãng giày
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {brands.map((item, index) => (
          <Link key={index}
            to={`/shoes?brand=${item.brandId}`}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <img src={item.logoUrl} alt="" className="w-20 h-20" />
              <div className="font-bold text-2xl">{item.brandName}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
