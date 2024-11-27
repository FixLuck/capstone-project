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

    @Column
    Instant updateDate;

    @Enumerated(EnumType.STRING)
    OrderConstants.OrderStatus orderStatus;

    @Column(nullable = false)
    Double discountAmount;

    @Column(nullable = false)
    Double finalTotal;

    @ManyToOne(fetch = FetchType.EAGER)
    User user;

    @OneToMany(mappedBy = "order")
    List<OrderDetail> orderDetails = new ArrayList<>();

    @ManyToOne
    Discount discount;

    @OneToOne
    PaymentDetail paymentDetail;

    public OrderDto getOrderDto() {
        OrderDto orderDto = new OrderDto();

        orderDto.setOrderId(id);
        orderDto.setOrderDate(orderDate);
        orderDto.setOrderStatus(orderStatus.toString());
        orderDto.setDiscountAmount(discountAmount);
        orderDto.setFinalTotal(finalTotal);
        orderDto.setOriginalTotal(originalTotal);
        orderDto.setUserId(user.getId()); // Lấy userId từ entity User
        orderDto.setUsername(user.getUsername()); // Lấy username từ entity User

        // Thông tin discount (mã giảm giá)
        if (discount != null) {
            orderDto.setDiscountId(String.valueOf(discount.getId()));
            orderDto.setCouponName(discount.getCode()); // Mã giảm giá từ Discount
        }

        // Thông tin payment detail (mã ngân hàng, loại thẻ)
        if (paymentDetail != null) {
            orderDto.setBankCode(paymentDetail.getBankCode()); // Mã ngân hàng
            orderDto.setCardType(paymentDetail.getCardType()); // Loại thẻ
        }

        // Thông tin người dùng
        if (user != null) {
            orderDto.setAddress(user.getAddress()); // Địa chỉ người dùng
            orderDto.setEmail(user.getEmail()); // Email người dùng
            orderDto.setPhone(user.getPhone()); // Số điện thoại người dùng
            orderDto.setFullName(user.getFullName()); // Tên đầy đủ của người dùng
        }

        // Lấy danh sách các sản phẩm trong đơn hàng
        List<CartItemResponse> cartItemResponses = orderDetails.stream()
                .map(orderDetail -> {
                    CartItemResponse cartItemResponse = new CartItemResponse();
                    cartItemResponse.setVariantId(orderDetail.getVariant().getId());
                    cartItemResponse.setPrice(orderDetail.getPrice());
                    cartItemResponse.setQuantity(orderDetail.getQuantity());
                    cartItemResponse.setProductId(orderDetail.getVariant().getShoe().getId());
                    cartItemResponse.setProductName(orderDetail.getVariant().getShoe().getName());
                    return cartItemResponse;
                })
                .collect(Collectors.toList());

        orderDto.setCartItems(cartItemResponses);

        return orderDto;
    }

}
