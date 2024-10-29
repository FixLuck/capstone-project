import React from 'react'
import { FiShoppingBag } from "react-icons/fi";

export default function ShoppingBag() {
  return (
    <div className='flex relative cursor-pointer'>
      <FiShoppingBag className='w-8 h-8'/>
      <span className='absolute -top-1 -right-1 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center'>0</span>
    </div>
  )
}
