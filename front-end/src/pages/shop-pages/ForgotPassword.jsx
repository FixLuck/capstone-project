import React, { useState } from "react";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { resetPasswordActions } from "@/store";
import { useDispatch } from "react-redux";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const submitEmail = (e) => {
    e.preventDefault();
    const sendEmail = async () => {
      try {
        const response = await api.post("/auth/email/send", {
          email: email,
        });

        if (response.data.flag) {
          alert(response.data.message);
          dispatch(resetPasswordActions.setEmail(email));

          setTimeout(() => {
            navigate("/forgot-password/verify-otp");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    };
    sendEmail();
  };

  return (
    <div className="min-h-80 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Quên Mật Khẩu
        </h2>
        <form className="mt-8 space-y-6" onSubmit={submitEmail}>
          <div>
            <label htmlFor="email" className="sr-only">
              Địa chỉ email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Gửi mã OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
