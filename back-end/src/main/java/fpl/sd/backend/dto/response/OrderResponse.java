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
public class OrderResponse {
    String orderId;
    double originalTotal;
    double discountAmount;
    double finalTotal;
    String userId;
    String username;
    String orderStatus;
    Instant orderDate;
    Integer discountId;
    List<CartItemResponse> items;
}
