import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';

export function FAQ() {
    return (
        <div className="mt-5 mb-5 bg-white p-5">
            <div className="mt-10 p-10">
                <h1 className="mt-5 text-xl font-bold text-center text-black">Câu hỏi thường gặp</h1>
                <Card className="w-full border-0 rounded-lg p-2">
                    <CardHeader>
                        <CardDescription className="font-bold text-center">
                            Chính sách bảo mật của website SuperTeam
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-6">
                            <div className="grid gap-2">
                                <div className="text-[20px]">

                                    <strong>Làm thế nào để thực hiện mua hàng?</strong><br/>
                                    Mua sắm tại cửa hàng trực tuyến SuperTeam rất dễ dàng và đơn giản. Hãy duyệt qua nền tảng thân thiện của chúng tôi. Khi bạn tìm thấy món đồ muốn mua, nhấn vào món hàng và chọn các tùy chọn như kích cỡ và màu sắc, sau đó nhấn "THÊM VÀO GIỎ" hoặc "MUA NGAY". Một cửa sổ pop-up sẽ xuất hiện trên màn hình của bạn với chi tiết đơn hàng và tùy chọn "THANH TOÁN". Từ đó, bạn sẽ được chuyển đến trang THANH TOÁN BẢO MẬT, điền đầy đủ thông tin cần thiết để hoàn tất và đặt đơn hàng của bạn.
                                    <br/><br/>
                                    <strong>Tôi có phải tạo tài khoản để đặt hàng không?</strong><br/>
                                    Bạn không cần tạo tài khoản để đặt hàng, chỉ cần chọn "THÊM VÀO GIỎ" hoặc "MUA NGAY". Tuy nhiên, việc tạo tài khoản rất nhanh chóng và dễ dàng! Có tài khoản với chúng tôi cũng có nghĩa là bạn có thể:
                                    <ul>
                                        <li>Xem lại và theo dõi tất cả các đơn hàng trước đó</li>
                                        <li>Lưu địa chỉ để việc mua sắm sau này trở nên dễ dàng hơn</li>
                                        <li>Quản lý chi tiết tài khoản của bạn dễ dàng và tự tin, bao gồm địa chỉ và tùy chọn email</li>
                                    </ul>
                                    <br/>
                                    <strong>Tôi có phải trả thêm thuế và phí nhập khẩu cho đơn hàng của mình không?</strong><br/>
                                    Không có thuế và phí nhập khẩu nào cần phải trả thêm cho đơn hàng của bạn. Tuy nhiên, chúng tôi không chịu trách nhiệm về bất kỳ thuế và phí nhập khẩu nào có thể áp dụng bởi hải quan tại quốc gia nơi giao hàng. Trách nhiệm về các khoản thuế nhập khẩu, thuế nước ngoài hoặc các khoản phí khác có thể được áp dụng sẽ thuộc về khách hàng. Vui lòng liên hệ với văn phòng hải quan địa phương của bạn để biết thêm thông tin về thuế và phí.
                                    <br/><br/>
                                    <strong>Tôi đã quên mật khẩu, tôi nên làm gì?</strong><br/>
                                    Nhấn vào liên kết "Quên mật khẩu?" trên trang "ĐĂNG NHẬP", chúng tôi sẽ gửi email cho bạn (đến email bạn đã dùng để tạo tài khoản) với mật khẩu mới.
                                    <br/><br/>
                                    <strong>Cửa hàng của bạn ở đâu và làm thế nào để liên hệ với bạn?</strong><br/>
                                    Chúng tôi có cửa hàng tại Thẩm Dương, Trung Quốc.
                                    <br/><br/>
                                    <strong>Làm sao tôi biết sản phẩm bạn bán là chính hãng?</strong><br/>
                                    Hãy yên tâm, chúng tôi là đại lý ủy quyền cho mọi thương hiệu mà chúng tôi cung cấp. Chúng tôi cam kết rằng tất cả các sản phẩm bán trên cửa hàng trực tuyến của chúng tôi đều là hàng chính hãng 100%.
                                    <br/><br/>
                                    <strong>Làm sao tôi biết món hàng có sẵn trong kho không?</strong><br/>
                                    Nếu bạn có thể chọn màu sắc và kích cỡ của món hàng đó và thêm vào giỏ hàng, có nghĩa là món hàng đó có sẵn. Tuy nhiên, xin lưu ý là cho đến khi bạn hoàn tất giao dịch, món hàng của bạn có thể bị mua bởi khách hàng khác vì chúng tôi không giữ hàng trong giỏ mua sắm.
                                    Những món hàng được đánh dấu là "Hết hàng" sẽ không có sẵn để mua trên website, nhưng đừng ngần ngại gửi email cho chúng tôi.
                                    <br/><br/>
                                    <strong>SuperTeam chấp nhận phương thức thanh toán nào?</strong><br/>
                                    Hiện tại, chúng tôi chỉ chấp nhận PayPal.
                                    <br/><br/>
                                    <strong>Sản phẩm của tôi sẽ được đóng gói như thế nào?</strong><br/>
                                    Tại SuperTeam, chúng tôi biết rằng việc nhận hàng là một phần trong niềm vui mua sắm! Vì vậy, chúng tôi tự tin rằng bạn sẽ hài lòng khi biết rằng đơn hàng của bạn sẽ được đóng gói kỹ càng, với đồ may mặc được bọc đôi và giày dép được đóng hộp kỹ lưỡng.
                                    <br/><br/>
                                    <strong>Đơn hàng của tôi đâu rồi?</strong><br/>
                                    Khi đơn hàng của bạn được xuất kho, chúng tôi sẽ gửi email cho bạn với số theo dõi đơn hàng cụ thể, bạn có thể theo dõi đơn hàng dễ dàng và an toàn. Bạn cũng có thể nhấn vào 'Theo dõi Đơn Hàng' trên trang chủ để tự theo dõi đơn hàng của mình.
                                    <br/><br/>
                                    <strong>Tôi nên làm gì nếu có vấn đề với đơn hàng của mình?</strong><br/>
                                    Nếu bạn nhận sai món hàng hoặc có món nào bị thiếu trong đơn hàng, chúng tôi rất tiếc! Vui lòng gửi email ngay cho chúng tôi tại inquiry@superteamsneaker.com và chúng tôi sẽ xử lý ngay lập tức.
                                    Nếu bạn nghĩ rằng sản phẩm của mình có lỗi, hoặc sản phẩm không phù hợp, chúng tôi có chính sách đổi trả trong 7 ngày mà bạn có thể đọc thêm tại 'GIAO HÀNG & ĐỔI TRẢ'.
                                    <br/><br/>
                                    <strong>SuperTeam và WearTesters.com có liên quan không?</strong><br/>
                                    Không. WearTesters là một trong những website đánh giá giày thể thao hàng đầu trên internet. Chúng tôi hợp tác với họ để cung cấp cho khách hàng thông tin sản phẩm đầy đủ nhất và cung cấp một khoản giảm giá nhỏ cho người dùng của họ.
                                    <br/><br/>
                                    Cập nhật: 23 tháng 11 năm 2021

                                    <strong>1. Thông tin chúng tôi thu thập</strong><br/>
                                    Khi bạn sử dụng dịch vụ của chúng tôi, chúng tôi có thể thu thập các thông tin sau:
                                    <ul>
                                        <li>Thông tin cá nhân: Tên, địa chỉ, số điện thoại, email và thông tin thanh toán khi bạn thực hiện giao dịch mua hàng.</li>
                                        <li>Thông tin thu thập tự động: Địa chỉ IP, loại thiết bị, trình duyệt và các dữ liệu khác liên quan đến việc bạn sử dụng website.</li>
                                    </ul>
                                    <br/>
                                    <strong>2. Cách chúng tôi sử dụng thông tin</strong><br/>
                                    Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
                                    <ul>
                                        <li>Xử lý đơn hàng và giao hàng.</li>
                                        <li>Cung cấp dịch vụ khách hàng.</li>
                                        <li>Gửi thông báo về sản phẩm, khuyến mãi và ưu đãi.</li>
                                        <li>Cải thiện trải nghiệm người dùng và tối ưu hóa website.</li>
                                    </ul>
                                    <br/>
                                    <strong>3. Bảo mật dữ liệu</strong><br/>
                                    Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và áp dụng các biện pháp bảo mật hợp lý để ngăn chặn việc truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy dữ liệu của bạn. Tuy nhiên, không có hệ thống bảo mật nào là hoàn hảo 100%, và chúng tôi không thể đảm bảo sự an toàn tuyệt đối của dữ liệu.
                                    <br/>
                                    <strong>4. Chia sẻ thông tin</strong><br/>
                                    Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ khi có sự đồng ý của bạn hoặc theo yêu cầu của pháp luật.
                                    <br/>
                                    <strong>5. Cookies</strong><br/>
                                    Website của chúng tôi có thể sử dụng cookies để thu thập thông tin về các hoạt động của bạn trên website, giúp chúng tôi cải thiện trải nghiệm người dùng và phục vụ bạn tốt hơn. Bạn có thể từ chối cookies qua cài đặt trình duyệt của mình.
                                    <br/>
                                    <strong>6. Quyền của bạn</strong><br/>
                                    Bạn có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân mà chúng tôi lưu trữ. Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến quyền riêng tư của mình, vui lòng liên hệ với chúng tôi.
                                    <br/>
                                    <strong>7. Thay đổi chính sách bảo mật</strong><br/>
                                    Chúng tôi có thể cập nhật hoặc thay đổi Chính sách bảo mật này bất cứ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
                                    <br/>
                                    <strong>8. Liên hệ</strong><br/>
                                    Nếu bạn có bất kỳ câu hỏi nào liên quan đến Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được liệt kê trên website của chúng tôi.

                                </div>
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

export default FAQ;
