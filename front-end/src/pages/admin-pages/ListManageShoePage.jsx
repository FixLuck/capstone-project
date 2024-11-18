import React from 'react'
import ShoeList from './ShoeList'

export default function ListManageShoePage() {
  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold text-center mb-16'>Danh sách quản lý giày</h1>
      <ShoeList/>
    </div>
  )
}
