import React, { useState, useEffect } from "react";
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
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";



export default function MemberOrderHistoryDetail ({ orderId }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [customerOrder, setCustomerOrder] = useState({});
  useEffect(() => {
    const fetchCustomerOrder = async () => {
    setIsLoading(true);
    try {
    const { data } = await api.get(`order-details/order/${orderId}`); 
    reset({
      finalTotal: data.result.finalTotal, 
      orderStatus: data.result.orderStatus,
      username: data.result.username, 
      orderDate: new Date(data.result.orderDate).toISOString().slice(0, 16), // Chuyển đổi startDate sang ISO 8601

    });
  } catch (error) {
    console.error("Error fetching order:", error);
    toast.error("Failed to fetch order details.");
  } finally {
    setIsLoading(false);
  }
};
    fetchCustomerOrder();
  }, [orderId, reset]);




  return (
    <div>
        
    </div>
  );
}
