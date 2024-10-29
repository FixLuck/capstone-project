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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';


function UserLogin() {
    return (
        <div className="flex items-center justify-center h-screen" style={{ backgroundImage: "url('https://short.com.vn/kd9s')", backgroundSize: "cover"}}>
            <div className="w-full max-w-full md:max-w-lg p-6 bg-white rounded-lg shadow-md">
                <h1 className="mt-5 text-lg font-bold text-center text-black">Login</h1>
                <div className="mt-1">
                    <Card className="w-full border-0 rounded-lg p-2">
                        <CardHeader>
                            <CardDescription className="font-bold text-center">Hello! Let's get started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full gap-6">
                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input id="email" type="email" className="border rounded-md p-2 w-full" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Password</Label>
                                    <Input id="password" type="password" className="border rounded-md p-2 w-full" />
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center">
                                        <Checkbox id="remember" />
                                        <label htmlFor="remember" className="ml-2 text-black">Remember me?</label>
                                    </div>
                                    <a href="#" className="underline text-black hover:text-yellow-500 transition-colors duration-200">Forgot password?</a>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-center">
                        <div className="w-full flex flex-col space-y-4">
                            <Button className="w-full bg-black text-white rounded p-2 hover:bg-gray-500">Login</Button>
                            <div className="flex justify-between">
                                <Button className="w-full bg-yellow-500 text-white rounded p-2 hover:bg-gray-500"><FontAwesomeIcon icon={faGoogle} className="mr-2" />Google</Button>
                                <Button className="ml-2 w-full bg-blue-500 text-white rounded p-2 hover:bg-gray-500"><FontAwesomeIcon icon={faFacebook} className="mr-2" />Facebook</Button>
                            </div>
                            <a href="#" className="text-center text-black hover:text-green-500 transition-colors duration-200 p-2">Don't have an account? Create one</a>
                        </div>   
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
export default UserLogin;