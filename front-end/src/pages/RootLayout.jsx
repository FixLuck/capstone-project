import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import ChatOpenAI from "./shop-pages/ChatOpenAI";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { BsFillChatQuoteFill } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function RootLayout() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="mt-32">
      <div className="fixed bottom-12 right-8 z-50">
        <Popover>
          <PopoverTrigger>
            <Button
              variant="outline"
              className="rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-shadow me-4"
            >
              <BsFillChatQuoteFill className="text-blue-400 text-3xl h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] h-[500px] me-8">
              <ChatOpenAI />
          </PopoverContent>
        </Popover>

        <Button
          onClick={scrollToTop}
          size="icon"
          variant="outline"
          className="rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-shadow"
        >
          <ArrowUp className="h-6 w-6 text-red-700" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
