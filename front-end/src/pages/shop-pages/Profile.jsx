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

function Profile() {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md grid grid-cols-3 gap-4 border rounded-sm"> {/* Chiếm toàn bộ màn hình */}
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
                        <CardDescription className="font-bold text-center">Show and edit your profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-6 border rounded-sm p-4 mb-4">
                            <div className="grid gap-2">
                                <Label>Username</Label>
                                <Input id="username" type="text" placeholder="dattdps34745" className="border rounded-md p-2 w-full" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Password</Label>
                                <Input id="password" type="password" placeholder="********" className="border rounded-md p-2 w-full" />
                            </div>
                        </div>
                        <div className="grid w-full gap-6 border rounded-sm p-4">
                            <div className="grid gap-2">
                                <Label>Email</Label>
                                <Input id="email" type="email" placeholder="dattdps34745@fpt.edu.vn" className="border rounded-md p-2 w-full" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Phone</Label>
                                <Input id="phone" type="text" placeholder="0901122334" className="border rounded-md p-2 w-full" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Role</Label>
                                <Input id="role" type="text" placeholder="member" className="border rounded-md p-2 w-full" disabled />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>      
    );
}
export default Profile;