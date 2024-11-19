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

  username: z.string().min(2, { message: "Yêu cầu nhập tên người dùng" }),
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

      // setActive(data.result.active); // Sync isActive with the user data from DB
      // reset(data.result);
      // setValue("active", data.result.active); // Initialize Switch value

    };
    fetchUser();
  }, [userId, reset, setValue]);

  const handleSwitchChange = (checked) => {

    setIsActive(checked); 
    setValue("isActive", checked); // Sync value with react-hook-form
    setIsChanged(checked !== user.isActive); // Detect change in active status
  };

  // const onSubmit = async (formData) => {
  //   const updateData = { ...formData, active };
  //   console.log("Data to update:", updateData);

  //   setIsActive(checked);
  //   setValue("isActive", checked); // Đồng bộ giá trị với react-hook-form
  //   setIsChanged(checked !== user.active); // Kiểm tra sự thay đổi trạng thái hoạt động
  // };

  const onSubmit = async (formData) => {
    const updateData = { ...formData, isActive };
    console.log("Dữ liệu cần cập nhật:", updateData);

    try {
      const response = await api.put(`users/${userId}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Phản hồi đầy đủ sau khi cập nhật:", response); // Log phản hồi đầy đủ
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng", error);
    }
  };


  return (
    <Dialog open={true} onOpenChange={onClose} className="min-h-screen">
      <DialogContent className="w-full max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin thành viên</DialogTitle>
          <DialogDescription>
            Thực hiện thay đổi trạng thái tài khoản. Nhấn lưu khi bạn hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Tên người dùng</Label>
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
                onCheckedChange={handleSwitchChange} // Thay đổi sự kiện để cập nhật trạng thái
              />
              <Label htmlFor="isActive">Trạng thái hoạt động</Label>

            </div>
          </div>

          <Separator className="my-4" />

          <DialogFooter>
            <Button type="submit" disabled={!isChanged}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
