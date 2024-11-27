package fpl.sd.backend.dto.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.entity.CartItem;
import fpl.sd.backend.entity.CustomerOrder;
import fpl.sd.backend.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderDetailResponse {
    String id;
    Instant orderDate;
    Double finalTotal;
    Double originalTotal;
    OrderConstants.OrderStatus orderStatus;
    String username;
    String userId;
    String fullName;
    String email;
    String address;
    String phone;
    String paymentId;
    String bankCode;
    String cardType;
    String discountId;
    String couponName;
    List<CartItemResponse> cartItems;


    public OrderDetailResponse getOrderDetailResponse(CustomerOrder customerOrder) {
        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
        orderDetailResponse.setOrderDate(orderDate);
        orderDetailResponse.setFinalTotal(finalTotal);
        orderDetailResponse.setOriginalTotal(originalTotal);
        orderDetailResponse.setOrderStatus(orderStatus);
        orderDetailResponse.setUserId(id);
        orderDetailResponse.setId(id);
        orderDetailResponse.setFullName(fullName);
        orderDetailResponse.setEmail(email);
        orderDetailResponse.setAddress(address);
        orderDetailResponse.setPhone(phone);
        orderDetailResponse.setBankCode(bankCode);
        orderDetailResponse.setCardType(cardType);
        orderDetailResponse.setDiscountId(discountId);
        orderDetailResponse.setCouponName(couponName);

        // Ánh xạ username từ User entity
        if (customerOrder.getUser() != null) {
            orderDetailResponse.setUsername(customerOrder.getUser().getUsername());
        }

        List<CartItemResponse> cartItemResponses = customerOrder.getOrderDetails().stream()
                .map(orderDetail -> {
                    CartItemResponse cartItemResponse = new CartItemResponse();
                    cartItemResponse.setVariantId(orderDetail.getVariant().getId());
                    cartItemResponse.setQuantity(orderDetail.getQuantity());
                    cartItemResponse.setPrice(orderDetail.getPrice());
                    cartItemResponse.setProductId(orderDetail.getVariant().getShoe().getId());
                    cartItemResponse.setProductName(orderDetail.getVariant().getShoe().getName());
                    return cartItemResponse;
                })
                .collect(Collectors.toList());
        orderDetailResponse.setCartItems(cartItemResponses);
        return orderDetailResponse;
    }
}
