import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function Footer() {
  return (
    <footer className='pt-14 pb-32 bg-white mt-4'>
      <div className='relative z-10 container grid lg:grid-cols-4 gap-8 mx-auto'>
        <div>
          <h4 className='font-bold text-2xl'>SUPER TEAM TẠI VIETNAM</h4>
          <div>
            <h1>GIỚI THIỆU</h1>
            <h1>Hệ thống cửa hàng</h1>
            <h1>Thông tin liên hệ</h1>
          </div>
        </div>
        <div>
          <h4 className='font-bold text-2xl'>CHÍNH SÁCH BÁN HÀNG</h4>
          <div>
            <h1>GIỚI THIỆU</h1>
            <h1>Hệ thống cửa hàng</h1>
            <h1>Thông tin liên hệ</h1>
          </div>
        </div>
        <div>
          <h4 className='font-bold text-2xl'>HỖ TRỢ KHÁCH HÀNG</h4>
          <div>
            <h1>GIỚI THIỆU</h1>
            <h1>Hệ thống cửa hàng</h1>
            <h1>Thông tin liên hệ</h1>
          </div>
        </div>
        <div>
          <h4 className='font-bold text-2xl'>NEW LETTERS</h4>
          <div>
            <p>Đăng ký nhận bản tin để cập nhật những tin tức mới nhất về SuperTeam in Vietnam</p>
            <div className='flex justify-between'>
              <Input type="text" placeholder='Địa chỉ email của bạn'/>
              <Button variant='destructive'>Đăng ký</Button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
