import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";
import { selectUser } from "@/store/auth";
import { useSelector } from "react-redux";
import LocationSelector from "@/components/shop/LocationSelector";
import { ToastContainer, toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./ChangePassword";

export default function ProfileUser() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(userData?.username || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [location, setLocation] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState(userData?.fullName || "");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = useSelector(selectUser);
  const userName = user ? user.sub : null;

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setFullName(userData.fullName || "");
      setAddress(userData.address || "");
    }
  }, [userData]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/profile?username=${userName}`);
        const data = response.data.result;
        setUserData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, user, userName]);

  const handleLocationChange = (locationData) => {
    if (locationData && locationData.fullAddress) {
      setLocation(locationData.fullAddress);
      updateFullAddress(locationData.fullAddress, street);
    }
  };

  const updateFullAddress = (loc, str) => {
    const addressParts = [];
    if (loc) addressParts.push(loc);
    if (str) addressParts.push(str);
    const newAddress = addressParts.join(", ");
    setAddress(newAddress);

    if (userData) {
      setUserData((prev) => ({
        ...prev,
        address: newAddress,
      }));
    }
  };

  useEffect(() => {
    updateFullAddress(location, street);
  }, [location, street]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!username || !email || !phone || !address) {
      alert("All fields are required");
      return;
    }

    const toastId = toast.loading("Updating user...");
    setLoading(true);

    try {
      const addressPart = address.split(", ");
      const reversedAddress = addressPart.reverse().join(", ");

      const response = await api.put(`/users/${userData.id}`, {
        username: username,
        email: email,
        phone: phone,
        address: reversedAddress,
        fullName: fullName,
      });
      if (response.data.flag) {
        toast.update(toastId, {
          render: "User updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="container mx-auto">
        <div className="col-span-1 border-r flex justify-center">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className='bg-slate-100'>
              <TabsTrigger value="profile">Your profile</TabsTrigger>
              <TabsTrigger value="change-password">Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="col-span-2 p-4">
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
                          <Label>FullName</Label>
                          <Input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="border rounded-md p-2 w-full"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Username</Label>
                          <Input
                            id="username"
                            type="text"
                            value={username}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="grid w-full gap-6 border rounded-sm p-4">
                        <div className="grid grid-cols-2 gap-4">
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
                        </div>
                        <div className="grid gap-2">
                          <Label>Current Address</Label>
                          <Input
                            id="address"
                            type="text"
                            value={address}
                            className="border rounded-md p-2 w-full"
                            readOnly
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Street</Label>
                          <Input
                            id="street"
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="border rounded-md p-2 w-full"
                          />
                          <LocationSelector
                            onLocationChange={handleLocationChange}
                          />
                        </div>
                      </div>

                      <CardFooter className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-blue-500"
                          onClick={handleUpdate}
                          disabled={loading}
                        >
                          Save Changes
                        </Button>
                      </CardFooter>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="change-password">
              <ChangePassword/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
