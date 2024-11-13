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
import api from "@/config/axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!termsAccepted) {
            setError("You must accept the terms and conditions to register.");
            setLoading(false);
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Password do not match!");
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('users', {
                username,
                email,
                password
            });

            if (response.data.success) {
                navigate("/login");
            } else {
                setError(response.data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Something went wrong. Please try again.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        //Code chức năng để đăng kí người dùng mới
        <div 
        className="flex items-center justify-center h-screen" 
        style={{ backgroundImage: "url('https://short.com.vn/kd9s')", 
        backgroundSize: "cover"}}>
            <div className="w-full max-w-full md:max-w-lg p-6 bg-white rounded-lg shadow-md">
                <h1 className="mt-5 text-lg font-bold text-center text-black">Register</h1>
                <div className="mt-1">
                    <Card className="w-full border-0 rounded-lg p-2">
                        <CardHeader>
                            <CardDescription className="font-bold text-center">Hello! Let's get register</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        type="username"
                                        id="username"
                                        className="border rounded-md p-2 w-full"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        className="border rounded-md p-2 w-full"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        className="border rounded-md p-2 w-full"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlfor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        className="border rounded-md p-2 w-full"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="items-top flex space-x-2">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                            Accept terms and conditions
                                            </label>
                                            <p className="text-sm text-muted-foreground">
                                            You agree to our Terms of Service and Privacy Policy.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-red-500 mt-2">{error}</div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-center">
                        <div className="w-full flex flex-col space-y-4">
                            <Button
                                    className="w-full bg-black text-white rounded p-2 hover:bg-gray-500"
                                    onClick={handleRegister}
                                    disabled={loading}
                            >
                                    {loading ? "Registering..." : "Register"}
                            </Button>
                            <a href="#" className="text-center text-black hover:text-green-500 transition-colors duration-200">Already have a account ? Login</a>
                            <Button className="w-full bg-blue-500 text-white rounded p-2 hover:bg-gray-500">Login with Facebook</Button>
                            <Button className="w-full bg-yellow-500 text-white rounded p-2 hover:bg-gray-500">Login with Google</Button>
                        </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
export default SignUp;