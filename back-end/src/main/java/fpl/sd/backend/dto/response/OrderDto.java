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
    double originalTotal;
    double discountAmount;
    double finalTotal;
    String username;
    String orderStatus;
    Instant orderDate;
    Integer discountId;
    List<CartItemResponse> cartItems;
    String couponName;

}
