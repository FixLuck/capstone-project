import React from "react";
import { FaFire } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { BiSolidDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { formatterToVND } from "@/utils/formatter";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store";

export default function HotShoeList({ shoes, titlte }) {

  const dispatch = useDispatch();
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
  return (
    <div className="bg-white rounded-sm p-4 my-4">
      <div className="flex">
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
        <p className="text-3xl font-bold me-2 items-center">{titlte}</p>
        <FaFire className="w-8 h-8 text-red-500" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
        {shoes.map((shoe) => (
          <Card key={shoe.id} className="hover:border-stone-950 cursor-pointer">
            <CardHeader>
              <CardTitle>{shoe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={shoe.images[0].url} alt="" />
              <p className="text-xl font-bold mt-2">
                {formatterToVND.format(shoe.price)}
              </p>
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
    </div>
  );
}
