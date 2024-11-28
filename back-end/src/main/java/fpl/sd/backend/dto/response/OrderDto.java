package fpl.sd.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDto {

String orderId;
    Instant orderDate;
    String orderStatus;
    Double discountAmount;
    Double finalTotal;
    Double originalTotal;
    String username;
    String userId; // Sửa lỗi mapping từ username sang userId
    String discountId;
    String couponName;
    String fullName;
    String email;
    String address;
    String phone;
    String bankCode;
    String cardType;
    List<CartItemResponse> cartItems;
    List<OrderDetailResponse> orderDetails; // Thêm chi tiết đơn hàng (nếu cần)
}
