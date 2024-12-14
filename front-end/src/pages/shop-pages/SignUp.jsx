import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//!?
const schema = z.object({
  username: z.string().min(1, { message: "Tên người dùng là bắt buộc" }),
  email: z.string().email({ message: "Địa chỉ email không hợp lệ" }),
  password: z
    .string()
    .min(3, { message: "Mật khẩu phải có ít nhất 3 ký tự" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Bạn phải chấp nhận các điều khoản và điều kiện",
  }),
});

function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleSignup = async (data) => {
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    setError("");
    const toastId = toast.loading("Đang tạo tài khoản...");

    try {
      const response = await api.post("/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.data.flag) {
        toast.update(toastId, {
            render: "Tạo tài khoản thành công",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(
          response.data.message || "Đăng ký thất bại. Vui lòng thử lại."
        );
        setLoading(false);
        toast.update(toastId, {
            render: error.response?.data?.message || "Lỗi khi tạo tài khoản",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại."
      );
      setLoading(false);
      toast.update(toastId, {
        render: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: "url('https://short.com.vn/kd9s')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-full md:max-w-lg p-6 bg-white rounded-lg shadow-md">
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
          transition="Bounce"
        />
        <h1 className="mt-5 text-lg font-bold text-center text-black">
          Đăng Ký
        </h1>
        <div className="mt-1">
          <form onSubmit={handleSubmit(handleSignup)}>
            <Card className="w-full border-0 rounded-lg p-2">
              <CardHeader>
                <CardDescription className="font-bold text-center">
                  Ồ bạn mới! Hãy đăng ký ngay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Tên người dùng</Label>
                    <Input
                      id="username"
                      type="text"
                      {...register("username")}
                    />
                    {errors.username && (
                      <p className="text-red-500">{errors.username.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="items-top flex space-x-2">
                      <input
                        id="termsAccepted"
                        type="checkbox"
                        {...register("termsAccepted")}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Chấp nhận điều khoản và điều kiện
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Bạn đồng ý với{" "}
                          <Link to="/terms" className="underline">
                            Điều khoản sử dụng
                          </Link>{" "}
                          và{" "}
                          <Link to="/privacy" className="underline">
                            Chính sách bảo mật
                          </Link>
                          .
                        </p>
                        {errors.termsAccepted && (
                          <p className="text-red-500">
                            {errors.termsAccepted.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <div className="w-full flex flex-col space-y-4">
                  <Button
                    className="w-full bg-black text-white rounded p-2 hover:bg-gray-500"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                  </Button>
                  <Link
                    to="/login"
                    className="text-center text-black hover:text-green-500 transition-colors duration-200"
                  >
                    Bạn đã có tài khoản? Đăng nhập
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
