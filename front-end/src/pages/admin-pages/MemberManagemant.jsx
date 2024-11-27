import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import api from "@/config/axios";
import UpdateMemberForm from "./UpdateMemberForm";

export function MemberManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchUsers = async () => {
    const { data } = await api.get("users");
    setUsers(data.result);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleUpdateSuccess = () => {
    setIsDialogOpen(false);
    fetchUsers(); // Cập nhật lại danh sách sau khi chỉnh sửa thành công
  };

  return (
    <div className="bg-white h-screen">
      <h1 className="mt-5 text-lg text-black-500 font-bold" align="center">
        Member Management
      </h1>

      <div className="mt-5">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Actions</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              {/* <TableHead>Address</TableHead> */}
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditClick(user.id)}
                    className="hover:bg-yellow-600 hover:text-white"
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                {/* <TableCell>{user.address}</TableCell> */}
                <TableCell>{user.roleName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog chỉ mở khi nhấn nút Edit */}
      {isDialogOpen && (
        <UpdateMemberForm
          userId={selectedUserId}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={handleUpdateSuccess}
        />
      )}

    </div>
  );
}

export default MemberManagement;
