import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import api from "@/config/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { add } from "date-fns";

const schema = z.object({
  username: z.string().min(2, { message: "Required" }),
  isActive: z.boolean(),


});

export default function UpdateMemberForm({ userId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [user, setUser] = React.useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await api.get(`users/${userId}`);
      setUser(data.result);
      reset(data.result);
    };
    fetchUser();
  }, [userId, reset]);

  const [isActive, setisActive] = useState(user.isActive)

  //   console.log(shoe);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog className='min-h-screen'>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-slate-950 hover:text-white"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Member Detail</DialogTitle>
          <DialogDescription>
            Make changes to account status. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              defaultValue={user.username}
              {...register("username")}
              disabled
             />
            {errors.username?.message && (
              <p className="text-red-600">{errors.username?.message}</p>
            )}
          </div>

          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                {...register("isActive")}
                onCheckedChange={(e) => setisActive(prev => !prev)}
                value={isActive}
              />
              <Label htmlFor="isActive">Active Status</Label>
            </div>
          </div>

          <Separator className="my-4" />

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
