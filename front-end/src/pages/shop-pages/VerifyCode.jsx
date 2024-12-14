import React, {useState} from "react";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { resetPasswordActions } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail } from "@/store/reset-password-slice";

export default function VerifyCode() {
  const [otpCode, setOtpCode] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const handleSubmit = (e) => {
    e.preventDefault();
    const verifyCode = async () => {
      try {
        const response = await api.post("/auth/verify-otp", {
          otpCode: otpCode,
          email: email,
        });


        console.log(response.data);
        
        if (response.data.flag) {
            dispatch(resetPasswordActions.setOtp(otpCode));
            setTimeout(() => {
              navigate("/forgot-password/reset-password");
            }, 500)
          
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
      
    };
    verifyCode();
  }

  return (
    <div className="min-h-80 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Xác Nhận Mã OTP
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="code" className="sr-only">
              Mã xác nhận
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter verification code"
              onChange={(e) => setOtpCode(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Xác nhận mã OPT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
