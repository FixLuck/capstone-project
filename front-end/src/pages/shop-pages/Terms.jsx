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

export function Terms() {
    return (
        <div className="mt-5 mb-5 bg-white p-5">
            <div className="mt-10 p-10" >
            <h1 className="mt-5 text-xl font-bold text-center text-black">Điều Khoản</h1>
            <Card className="w-full border-0 rounded-lg p-2">
              <CardHeader>
                <CardDescription className="font-bold text-center">
                  Điều khoản và điều kiện của website SuperTeam
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-6">
                  <div className="grid gap-2">
                    <p className="text-[20px]">
                    1. Giới thiệu:

                    Chào mừng bạn đến với website SuperTeam. Bằng cách sử dụng website và dịch vụ của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sau. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng website của chúng tôi.
                    <br/>
                    2. Dịch vụ:

                    Chúng tôi cung cấp một loạt các sản phẩm giày dép, bao gồm giày thể thao, giày công sở, giày thời trang và các phụ kiện liên quan. Dịch vụ của chúng tôi bao gồm cung cấp thông tin sản phẩm, bán hàng trực tuyến, giao hàng và hỗ trợ khách hàng.
                    <br/>
                    3. Quyền sở hữu và sử dụng website:

                    Website này và tất cả các nội dung, bao gồm thiết kế, văn bản, hình ảnh, biểu tượng, logo và các thành phần khác, là tài sản của chúng tôi hoặc các nhà cung cấp nội dung của chúng tôi. Bạn không được sao chép, tái sản xuất, phân phối, công khai, sửa đổi hoặc khai thác bất kỳ phần nào của website này mà không có sự cho phép rõ ràng từ chúng tôi.
                    <br/>
                    4. Đặt hàng và giao dịch:

                    Khi bạn đặt hàng trên website của chúng tôi, bạn đồng ý rằng thông tin bạn cung cấp là chính xác và đầy đủ. Chúng tôi có quyền từ chối hoặc hủy bỏ bất kỳ đơn hàng nào nếu phát hiện thông tin không chính xác hoặc vi phạm chính sách của website.
                    <br/>
                    5. Thanh toán:

                    Chúng tôi cung cấp nhiều phương thức thanh toán khác nhau, bao gồm thẻ tín dụng, thẻ ghi nợ, chuyển khoản ngân hàng và các phương thức thanh toán điện tử khác. Bạn đồng ý thanh toán toàn bộ số tiền cho các sản phẩm bạn mua trên website thông qua các phương thức thanh toán hỗ trợ.
                    <br/>
                    6. Chính sách trả hàng:

                    Nếu bạn không hài lòng với sản phẩm đã mua, bạn có thể yêu cầu trả lại trong vòng [số ngày] ngày kể từ ngày nhận hàng, với điều kiện sản phẩm chưa được sử dụng và vẫn còn trong bao bì nguyên vẹn.
                    <br/>
                    7. Quyền của chúng tôi:

                    Chúng tôi có quyền thay đổi hoặc sửa đổi các điều khoản và điều kiện này vào bất kỳ thời điểm nào mà không cần thông báo trước. Việc bạn tiếp tục sử dụng website sau khi các thay đổi này sẽ được coi là bạn đã chấp nhận các điều khoản đã sửa đổi.
                    <br/>
                    8. Liên hệ:

                    Nếu bạn có bất kỳ câu hỏi nào liên quan đến các điều khoản và điều kiện này, vui lòng liên hệ với chúng tôi qua email hoặc điện thoại được liệt kê trên website của chúng tôi.
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
  
  export default Terms;
