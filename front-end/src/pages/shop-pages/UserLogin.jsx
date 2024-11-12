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

const schema = z.object({
  username: z.string().min(1, { message: "Required" }),
  password: z.string().min(8, { message: "Required" }),
});

function UserLogin() {
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

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
      console.log(token);
      dispatch(authActions.loginSuccess(token));
      navigate("/");
    } catch (err) {
      dispatch(authActions.loginFailure(err));
      alert(err);
    }
  };


  return (
    //Code chức năng để đăng nhập tài khoản người dùng, code chức năng để đăng xuất
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: "url('https://short.com.vn/kd9s')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-full md:max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="mt-5 text-lg font-bold text-center text-black">Login</h1>
        <div className="mt-1">
          <form onSubmit={handleSubmit(handleLogin)}>
            <Card className="w-full border-0 rounded-lg p-2">
              <CardHeader>
                <CardDescription className="font-bold text-center">
                  Hello! Let's get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-6">
                  <div className="grid gap-2">
                    <Label>Username</Label>
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
                    <Label>Password</Label>
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
                        Remember me?
                      </label>
                    </div>
                    <a
                      href="#"
                      className="underline text-black hover:text-yellow-500 transition-colors duration-200"
                    >
                      Forgot password?
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
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                  {error && <p>{error}</p>}
                  <div className="flex justify-between">
                    <Button className="w-full bg-yellow-500 text-white rounded p-2 hover:bg-gray-500">
                      <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                      Google
                    </Button>
                    <Button className="ml-2 w-full bg-blue-500 text-white rounded p-2 hover:bg-gray-500">
                      <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                      Facebook
                    </Button>
                  </div>
                  <a
                    href="#"
                    className="text-center text-black hover:text-green-500 transition-colors duration-200 p-2"
                  >
                    Don't have an account? Create one
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
