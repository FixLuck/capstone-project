import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';

export function Privacy() {
    return (
        <div className="mt-5 mb-5 bg-white p-5">
            <div className="mt-10 p-10" >
            <h1 className="mt-5 text-xl font-bold text-center text-black">Chính sách bảo mật</h1>
            <Card className="w-full border-0 rounded-lg p-2">
              <CardHeader>
                <CardDescription className="font-bold text-center">
                    Chính sách bảo mật của website SuperTeam
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-6">
                  <div className="grid gap-2">
                    <p className="text-[20px]">
                    1. Thông tin chúng tôi thu thập

                    Khi bạn sử dụng dịch vụ của chúng tôi, chúng tôi có thể thu thập các thông tin sau:

                    Thông tin cá nhân: Tên, địa chỉ, số điện thoại, email và thông tin thanh toán khi bạn thực hiện giao dịch mua hàng.
                    Thông tin thu thập tự động: Địa chỉ IP, loại thiết bị, trình duyệt và các dữ liệu khác liên quan đến việc bạn sử dụng website.
                    <br/>
                    2. Cách chúng tôi sử dụng thông tin

                    Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:

                    Xử lý đơn hàng và giao hàng.
                    Cung cấp dịch vụ khách hàng.
                    Gửi thông báo về sản phẩm, khuyến mãi và ưu đãi.
                    Cải thiện trải nghiệm người dùng và tối ưu hóa website.
                    <br/>
                    3. Bảo mật dữ liệu

                    Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và áp dụng các biện pháp bảo mật hợp lý để ngăn chặn việc truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy dữ liệu của bạn. Tuy nhiên, không có hệ thống bảo mật nào là hoàn hảo 100%, và chúng tôi không thể đảm bảo sự an toàn tuyệt đối của dữ liệu.
                    <br/>
                    4. Chia sẻ thông tin

                    Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ khi có sự đồng ý của bạn hoặc theo yêu cầu của pháp luật.
                    <br/>
                    5. Cookies

                    Website của chúng tôi có thể sử dụng cookies để thu thập thông tin về các hoạt động của bạn trên website, giúp chúng tôi cải thiện trải nghiệm người dùng và phục vụ bạn tốt hơn. Bạn có thể từ chối cookies qua cài đặt trình duyệt của mình.
                    <br/>
                    6. Quyền của bạn

                    Bạn có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân mà chúng tôi lưu trữ. Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến quyền riêng tư của mình, vui lòng liên hệ với chúng tôi.
                    <br/>
                    7. Thay đổi chính sách bảo mật

                    Chúng tôi có thể cập nhật hoặc thay đổi Chính sách bảo mật này bất cứ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
                    <br/>
                    8. Liên hệ

                    Nếu bạn có bất kỳ câu hỏi nào liên quan đến Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được liệt kê trên website của chúng tôi.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-end">
                <Link to="/register" className="flex items-center px-4 py-2 bg-black text-white rounded">
                    <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Bạn đã đọc và hiểu tất cả nội dung? Quay lại Đăng ký.
                </Link>
              </CardFooter>
            </Card>
            </div>
      </div>
  
    );
  }
  
  export default Privacy;
