// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useNavigate } from "react-router-dom";
// import api from "@/config/axios";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";


// // Validation schema using Zod

// //!?

// const schema = z.object({
//   username: z.string().min(1, { message: "Username is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
// });

// function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();


//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Extract username from token payload
//     const decodedToken = JSON.parse(atob(token.split('.')[1]));
//     const username = decodedToken.sub; // Username is stored as `sub` in JWT payload


//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const decodedToken = JSON.parse(atob(token.split('.')[1]));
//     const userId = decodedToken.sub;


    

//     const fetchUserData = async () => {
//       setLoading(true);
//       setError(null);
//       try {

//         // Fetch user data by username instead of userId
//         const response = await api.get(`/profile?username=${username}`, {

//         const response = await api.get(`/users/${userId}`, {

//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const userData = response.data.result;
//         setUser(userData);
//       } catch (err) {
//         setError("Failed to fetch user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [token, navigate]);

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const handleUpdate = async (data) => {
//     setLoading(true);
//     setError(null);

//     const updatedData = {
//       username: data.username,
//       email: data.email,
//       phone: data.phone,
//       password: data.password,
//       role: user?.role, // Người dùng không được phép thay đổi role
//     };

//     try {
//       const response = await api.put(
//         `/users/${user.id}`,
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const updatedUser = response.data.result;
//       setUser(updatedUser);
//       setError("Update successful!");
//     } catch (err) {
//       setError("Failed to update user data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (

//     <div className="w-full p-6 bg-white rounded-lg shadow-md grid grid-cols-3 gap-4 border">

//       <div className="col-span-1 border-r flex justify-center">
//         <div className="w-60 flex flex-col space-y-4">
//           <Button className="bg-green-500">My Profile</Button>
//           <Button className="bg-yellow-500">Security</Button>
//         </div>
//       </div>
//       <div className="col-span-2 p-4">
//         <h1 className="text-lg font-bold text-black">My Profile</h1>
//         <div className="mt-1">
//           <form onSubmit={handleSubmit(handleUpdate)}>

//             <Card className="w-full border-0">
//               <CardHeader>
//                 <CardDescription className="font-bold text-center">
//                   Show and edit your profile
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>

//           <Card className="w-full border-0">
//             <CardHeader>
//               <CardDescription className="font-bold text-center">
//                 Show and edit your profile
//               </CardDescription>
//             </CardHeader>
//             <CardContent>

//                 <div className="grid w-full gap-6 border rounded-sm p-4 mb-4">
//                   <div className="grid gap-2">
//                     <Label>Username</Label>
//                     <Input
//                       id="username"
//                       type="text"
//                       defaultValue={user?.username}
//                       {...register("username")}
//                       className="border rounded-md p-2 w-full"
//                     />
//                     {errors.username && <p className="text-red-500">{errors.username.message}</p>}
//                   </div>

//                   <div className="grid gap-2">
//                     <Label>Password</Label>
//                     <Input
//                       id="password"
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="border rounded-md p-2 w-full"
//                       placeholder="********"
//                     />
//                     {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//                   </div>
//                 </div>

//                 <div className="grid w-full gap-6 border rounded-sm p-4">
//                   <div className="grid gap-2">
//                     <Label>Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       defaultValue={user?.email}
//                       {...register("email")}
//                       className="border rounded-md p-2 w-full"
//                     />
//                     {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//                   </div>

//                   <div className="grid gap-2">
//                     <Label>Phone</Label>
//                     <Input
//                       id="phone"
//                       type="text"
//                       defaultValue={user?.phone}
//                       {...register("phone")}
//                       className="border rounded-md p-2 w-full"
//                     />
//                     {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
//                   </div>

//                   <div className="grid gap-2">
//                     <Label>Role</Label>
//                     <Input
//                       id="role"
//                       type="text"
//                       value={user?.role}
//                       disabled
//                       className="border rounded-md p-2 w-full"
//                     />
//                   </div>
//                 </div>

//                 <CardFooter className="flex justify-end">
//                   <Button type="submit" className="bg-blue-500" disabled={loading}>
//                     Save Changes
//                   </Button>
//                 </CardFooter>

//               </CardContent>
//             </Card>

//             </CardContent>
//           </Card>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
//   )
// }

// export default Profile;
