package fpl.sd.backend.entity;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.response.CartItemResponse;
import fpl.sd.backend.dto.response.OrderDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    @Column(nullable = false)
    Double originalTotal;

    @Column(nullable = false)
    Instant orderDate;

    @Enumerated(EnumType.STRING)
    OrderConstants.OrderStatus orderStatus;

    @Column(nullable = false)
    Double discountAmount;

    @Column(nullable = false)
    Double finalTotal;

    @ManyToOne
    User user;

    @OneToMany(mappedBy = "order")
    List<OrderDetail> orderDetails = new ArrayList<>();

    @ManyToOne
    Discount discount;

    @ManyToOne
    PaymentDetail paymentDetail;

    public OrderDto getOrderDto() {
        OrderDto orderDto = new OrderDto();

        orderDto.setOrderId(id);
        orderDto.setOrderDate(orderDate);
        orderDto.setOrderStatus(orderStatus.toString());
        orderDto.setDiscountAmount(discountAmount);
        orderDto.setFinalTotal(finalTotal);
        orderDto.setOriginalTotal(originalTotal);
        orderDto.setUsername(user.getUsername());

        if(discount!=null){
            orderDto.setDiscountId(discount.getId());
            orderDto.setCouponName(discount.getCode());
        }
        List<CartItemResponse> cartItemResponses = orderDetails.stream()
                .map(orderDetail -> {
                    CartItemResponse cartItemResponse = new CartItemResponse();
                    cartItemResponse.setVariantId(orderDetail.getVariant().getId());
                    cartItemResponse.setQuantity(orderDetail.getQuantity());
                    cartItemResponse.setPrice(orderDetail.getPrice());
                    return cartItemResponse;
                })
                .collect(Collectors.toList());

        orderDto.setCartItems(cartItemResponses);

        return orderDto;
    }

}
