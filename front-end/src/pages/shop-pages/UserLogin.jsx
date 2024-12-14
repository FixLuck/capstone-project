import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectError } from "../../store/auth";
import { authActions } from "@/store";
import { selectUser } from "../../store/auth";

const schema = z.object({
  username: z.string().min(1, { message: "Tên người dùng là bắt buộc" }),
  password: z.string().min(8, { message: "Mật khẩu ít nhất 8 ký tự" }),
});

function UserLogin() {
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  
  const user = useSelector(selectUser);
  const userName = user ? user.sub : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),  
  });

  const handleLogin = async (data) => {
    dispatch(authActions.loginStart());

    try {
      const response = await api.post("auth/token", data);
      const token = response.data.result.token;
      localStorage.setItem("token", token);
      dispatch(authActions.loginSuccess(token));
      navigate("/");
      
    } catch (err) {
      console.log(err.response.data.message);
      alert('Username or password is incorrect');
      dispatch(authActions.loginFailure());
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
        <h1 className="mt-5 text-lg font-bold text-center text-black">Đăng Nhập</h1>
        <div className="mt-1">
          <form onSubmit={handleSubmit(handleLogin)}>
            <Card className="w-full border-0 rounded-lg p-2">
              <CardHeader>
                <CardDescription className="font-bold text-center">
                  Chào bạn! Hãy đăng nhập nhé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-6">
                  <div className="grid gap-2">
                    <Label>Tên người dùng</Label>
                    <Input
                      id="username"
                      type="text"
                      className="border rounded-md p-2 w-full"
                      {...register("username")}
                    />
                    {errors.username && (
                      <p className="text-red-500">{errors.username.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label>Mật khẩu</Label>
                    <Input
                      id="password"
                      type="password"
                      className="border rounded-md p-2 w-full"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <Checkbox id="remember" />
                      <label htmlFor="remember" className="ml-2 text-black">
                        Ghi nhớ tài khoản?
                      </label>
                    </div>
                    <a
                      href="/forgot-password"
                      className="underline text-black hover:text-yellow-500 transition-colors duration-200"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>
                  </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <div className="w-full flex flex-col space-y-4">
                  <Button
                    disabled={isLoading}
                    className="w-full bg-black text-white rounded p-2 hover:bg-gray-500"
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                  {error && <p>{error}</p>}
                  <a
                    href="/register"
                    className="text-center text-black hover:text-green-500 transition-colors duration-200 p-2"
                  >
                    Chưa có tài khoản? Tạo một tài khoản
                  </a>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
