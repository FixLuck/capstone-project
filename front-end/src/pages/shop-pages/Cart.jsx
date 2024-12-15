import React, { useEffect } from "react";
import { Minus, Plus, Heart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store";
import { ToastContainer, toast } from "react-toastify";
import { selectItems } from "@/store/cart-slice";
import { Link } from "react-router-dom";
import { formatterToVND } from "../../utils/formatter";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/store/auth";
import { cartTotalActions } from "@/store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { FaHome } from "react-icons/fa";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const couponCode = useRef();

  const [discountInfo, setDiscountInfor] = useState(null);

  const removeItem = (id) => {
    dispatch(cartActions.removeEntireItemFromCart(id));
  };

  const addToCart = (item) => {
    dispatch(cartActions.addItemToCart(item));
  };

  const removeFromCart = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const handleApplyCode = async () => {
    const currentCode = couponCode.current.value;

    try {
      const response = await api.post(`/orders/apply-discount`, {
        discount: currentCode,
      });

      if (!response.data.flag) {
        setDiscountInfor(null);
        toast.error(response.data.message);
      }

      if (response.data.flag) {
        setDiscountInfor(response.data.result);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply discount");
    }
  };

  const calculateTotals = () => {
    const originalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let discountAmount = 0;
    if (discountInfo && discountInfo.active) {
      if (originalPrice >= discountInfo.minimumOrderAmount) {
        if (discountInfo.discountType === "PERCENTAGE") {
          discountAmount = (originalPrice * discountInfo.percentage) / 100;
        } else if (discountInfo.discountType === "FIXED_AMOUNT") {
          discountAmount = discountInfo.fixedAmount;
        }
      }
    }
    const storePickup = 50000;
    const tax = originalPrice * 0.1;
    const total = originalPrice - discountAmount + storePickup + tax;

    return {
      originalPrice,
      discountAmount,
      storePickup,
      tax,
      total,
      discountId: discountInfo?.id || null,
      appliedCoupon: discountInfo?.coupon || null,
      discountType: discountInfo?.discountType || null,
      minimumOrderAmount: discountInfo?.minimumOrderAmount || 0,
    };
  };
  useEffect(() => {
    const totals = calculateTotals();
    dispatch(cartTotalActions.setCartTotal(totals));
  }, [items, discountInfo, dispatch]);

  const totals = calculateTotals();

  if (!items.length) {
    return (
      <div className="container mx-auto p-6 bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-6">Giỏ Hàng Của Bạn</h1>
        <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
        <Link to="/">
          <Button className="mt-6">Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-md">
      <ToastContainer
        autoClose={2000}
        position="top-right"
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
                    <BreadcrumbLink href="/cart">Giỏ hàng</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
      <h1 className="text-2xl font-bold mb-6">Giỏ Hàng</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {items.map((item, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-32 h-32 object-contain bg-gray-100"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Size: {item.size}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Xóa</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold">
                      {formatterToVND.format(item.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">Tổng quan giỏ hàng</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng giá niêm yết</span>
                  <span>{formatterToVND.format(totals.originalPrice)}</span>
                </div>

                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Giảm giá{" "}
                      {totals.appliedCoupon && `(${totals.appliedCoupon})`}
                      {totals.discountType === "PERCENTAGE" &&
                        ` ${discountInfo.percentage}%`}
                    </span>
                    <span>-{formatterToVND.format(totals.discountAmount)}</span>
                  </div>
                )}

                {discountInfo &&
                  totals.originalPrice < totals.minimumOrderAmount && (
                    <div className="text-red-500 text-sm">
                      Thêm{" "}
                      {formatterToVND.format(
                        totals.minimumOrderAmount - totals.originalPrice
                      )}{" "}
                      khi áp dụng mã này
                    </div>
                  )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span>{formatterToVND.format(totals.storePickup)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thuế</span>
                  <span>{formatterToVND.format(totals.tax)}</span>
                </div>

                <div className="pt-4 border-t mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng</span>
                    <span>{formatterToVND.format(totals.total)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Tiến hành thanh toán
              </Button>

              <div className="text-center mt-4">
                <span className="text-gray-600">hoặc</span>
                <Link to="/">
                  <button className="ml-2 text-blue-600 hover:underline">
                    Tiếp tục mua sắm
                  </button>
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">
                 Bạn có mã giảm giá hay thẻ quà tặng không ?
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 border rounded-md"
                    placeholder="Nhập mã giảm vào đây"
                    ref={couponCode}
                  />
                  <Button variant="outline" onClick={handleApplyCode}>
                    Áp dụng mã giảm giá
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
