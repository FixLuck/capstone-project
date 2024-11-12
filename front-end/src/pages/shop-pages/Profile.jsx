import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";

function Profile() {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

 
    const token = localStorage.getItem("authToken");
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.sub;
    useEffect(() => {
        if (!token) {
        navigate("/login"); 
        return;
        }

        
        const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            });

            const userData = response.data.result; 
            setUser(userData); 
            setUsername(userData.username);
            setEmail(userData.email);
            setPhone(userData.phone);
            setRole(userData.role);
        } catch (err) {
            setError("Failed to fetch user data."); 
        } finally {
            setLoading(false);
        }
        };

        fetchUserData();
    }, [token, navigate]); 

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!username || !email || !phone) {
        setError("All fields are required");
        return;
        }

        setLoading(true);
        setError(null);

        try {
        const response = await api.put(
            `/users/${user.id}`,
            {
            username,
            email,
            phone,
            role,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        setUser(response.data.result);
        setError("Update successful!");
        } catch (err) {
        setError("Failed to update user data.");
        } finally {
        setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md grid grid-cols-3 gap-4 border rounded-sm">
      <div className="col-span-1 border-r flex justify-center">
        <div className="w-60 flex flex-col space-y-4">
          <Button className="bg-green-500">My Profile</Button>
          <Button className="bg-yellow-500">Security</Button>
        </div>
      </div>
      <div className="col-span-2 p-4">
        <h1 className="text-lg font-bold text-black">My Profile</h1>
        <div className="mt-1">
          <Card className="w-full border-0">
            <CardHeader>
              <CardDescription className="font-bold text-center">
                Show and edit your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full gap-6 border rounded-sm p-4 mb-4">
                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
              </div>
              <div className="grid w-full gap-6 border rounded-sm p-4">
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Input
                    id="role"
                    type="text"
                    value={role}
                    disabled
                    className="border rounded-md p-2 w-full"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleUpdate} className="bg-blue-500">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
