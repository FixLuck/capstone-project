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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');  // Reset any previous error

        try {
            const response = await axios.post('/api/v1/login', { email, password });

            if (response.data.success) {
                localStorage.setItem('authToken', response.data.token);
                window.location.href = '/dashboard';
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        //Code chức năng để đăng nhập tài khoản người dùng, code chức năng để đăng xuất 
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
                                    <Input
                                        id="email"
                                        type="email"
                                        className="border rounded-md p-2 w-full"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="border rounded-md p-2 w-full"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-red-500">{error}</div>
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
                            <Button
                                    className="w-full bg-black text-white rounded p-2 hover:bg-gray-500"
                                    onClick={handleLogin}
                                    disabled={loading}
                            >
                                    {loading ? 'Logging in...' : 'Login'}
                            </Button>
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