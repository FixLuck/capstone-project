package fpl.sd.backend.dto.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.entity.CartItem;
import fpl.sd.backend.entity.CustomerOrder;
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
    OrderConstants.OrderStatus orderStatus;

    List<CartItemResponse> cartItems;


    public OrderDetailResponse getOrderDetailResponse(CustomerOrder customerOrder) {
        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
        orderDetailResponse.setOrderDate(orderDate);
        orderDetailResponse.setFinalTotal(finalTotal);
        orderDetailResponse.setOrderStatus(orderStatus);
        orderDetailResponse.setId(id);

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
