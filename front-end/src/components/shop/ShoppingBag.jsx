import React from 'react'
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from 'react-redux';
import {selectTotalQuantity} from "@/store/cart-slice";

export default function ShoppingBag() {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <div className='flex relative cursor-pointer'>
      <FiShoppingBag className='w-8 h-8'/>
      {totalQuantity > 0 && (
        <span className='absolute -top-1 -right-1 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center'>{totalQuantity}</span>
      )}
    </div>
  )
}
