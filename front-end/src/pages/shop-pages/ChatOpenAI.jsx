import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdSend } from "react-icons/io";
import api from "@/config/axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AiFillOpenAI } from "react-icons/ai";
import MessageParser from "@/utils/MessageParser";

export default function ChatOpenAI() {
  const [option, setOption] = useState("shoe-data");
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Xin chào, bạn muốn tôi giúp đỡ gì không ?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const userMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: input,
      };

      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      const response = await api.post(`/chat/${option}`, {
        content: input,
      });

      if (response.data.flag) {
        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.data.result,
        };

        setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        const assistantMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Error: ${response.data.message}`,
        };
        setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }
    } catch (error) {
      console.error(error);
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "An error occurred. Please try again later.",
      };
      setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  console.log(chatMessages.content);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-full max-w-full">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AiFillOpenAI className="w-8 h-8 text-green-800" />
        <span>Chat với chúng tôi</span>
      </h1>
      <div className="flex-grow overflow-auto mb-4 border rounded-md p-4">
        {chatMessages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 flex flex-col ${
              m.role === "user"
                ? "items-end text-right"
                : "items-start text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg max-w-[80%] ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <MessageParser content={m.content} />
            </span> 
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select value={option} onValueChange={setOption}>
          <SelectTrigger>
            <SelectValue placeholder="Tùy chọn" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shoe-data">Về sản phẩm</SelectItem>
            <SelectItem value="discount-data">Về mã giảm giá</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button
            type="submit"
            variant="outline"
            className="bg-blue-500 hover:bg-blue-300 text-white"
            disabled={loading}
          >
            {loading ? (
              <DotLottieReact
                src="https://lottie.host/22c724a8-0a83-4f77-87bc-142fee941436/RbKBFQXLf7.lottie"
                loop
                autoplay
              />
            ) : (
              <IoMdSend className="w-6 h-6" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
