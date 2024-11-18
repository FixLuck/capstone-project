import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";
import { formatterToVND, formatPaymentDate } from "@/utils/formatter";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store";

export default function PaymentCallbackPage() {
  const [status, setStatus] = useState("loading");
  const [paymentDetails, setPayementDetails] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePaymentCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const orderInfo = urlParams.get('vnp_OrderInfo');

        console.log(urlParams.toString());

        const response = await api.get(
          `payment/payment-callback?${urlParams.toString()}`
        );
        console.log(response.data);

        if (response.data.flag === true) {
          const paymentData = response.data.result.paymentDetail
          setStatus("success");
          setPayementDetails({
            amount: paymentData.amount, 
            orderInfo: orderInfo,
            payDate: formatPaymentDate(paymentData.paymentDate),
            bankCode: paymentData.bankCode,
            transactionNo: paymentData.transactionNo,
            cardType: paymentData.cardType,
          });
          dispatch(cartActions.clearCart());
        } else {
          setStatus("error");
          setError(response.data.message || "Xác minh thanh toán thất bại");
        }
      } catch (error) {
        setStatus("error");
        setError(
          error.response?.data?.message || "Xác minh thanh toán thất bại"
        );
      }
    };
    handlePaymentCallback();
  }, []);

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Thanh toán{" "}
          {status === "success"
            ? "Thành công"
            : status === "error"
            ? "Thất bại"
            : "Đang xử lý"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === "loading" && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {status === "success" && paymentDetails && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-semibold">Số tiền:</dt>
              <dd>{formatterToVND.format(paymentDetails.amount)}</dd>
              <dt className="font-semibold">Thông tin đơn hàng:</dt>
              <dd>{paymentDetails.orderInfo}</dd>
              <dt className="font-semibold">Ngày thanh toán:</dt>
              <dd>{paymentDetails.payDate}</dd>
              <dt className="font-semibold">Ngân hàng:</dt>
              <dd>{paymentDetails.bankCode}</dd>
              <dt className="font-semibold">Mã giao dịch:</dt>
              <dd>{paymentDetails.transactionNo}</dd>
              <dt className="font-semibold">Loại thẻ:</dt>
              <dd>{paymentDetails.cardType}</dd>
            </dl>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
            <p className="text-center text-red-600">{error}</p>
          </div>
        )}

        <button
          onClick={handleReturn}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Quay lại trang chủ
        </button>
      </CardContent>
    </Card>
  );
}
