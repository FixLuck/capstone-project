import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/config/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  username: z.string().min(2, { message: "Required" }),
  isActive: z.boolean(),
});

export default function UpdateMemberForm({ userId, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [user, setUser] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await api.get(`users/${userId}`);
      setUser(data.result);
      setIsActive(data.result.active); // Sync isActive with the user data from DB
      reset(data.result);
      setValue("isActive", data.result.active); // Initialize Switch value
    };
    fetchUser();
  }, [userId, reset, setValue]);

  const handleSwitchChange = (checked) => {
    setIsActive(checked); 
    setValue("isActive", checked); // Sync value with react-hook-form
    setIsChanged(checked !== user.active); // Detect change in active status
  };

  const onSubmit = async (formData) => {
    const updateData = { ...formData, isActive };
    console.log("Data to update:", updateData);
    try {
      const response = await api.put(`users/${userId}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Full Update response:", response); // Log full response
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose} className="min-h-screen">
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
            {errors.username?.message && <p className="text-red-600">{errors.username?.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={handleSwitchChange} // Change event to update the state
              />
              <Label htmlFor="isActive">Active Status</Label>
            </div>
          </div>

          <Separator className="my-4" />

          <DialogFooter>
            <Button type="submit" disabled={!isChanged}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
