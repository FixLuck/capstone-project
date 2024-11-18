package fpl.sd.backend.service;

import fpl.sd.backend.constant.DiscountConstants;
import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.request.ApplyDiscountRequest;
import fpl.sd.backend.dto.request.OrderRequest;
import fpl.sd.backend.dto.response.ApplyDiscountResponse;
import fpl.sd.backend.dto.response.CartItemResponse;
import fpl.sd.backend.dto.response.OrderDto;
import fpl.sd.backend.dto.response.OrderResponse;
import fpl.sd.backend.entity.*;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.OrderMapper;
import fpl.sd.backend.repository.*;
import jakarta.validation.ValidationException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);
    OrderMapper orderMapper;
    UserRepository userRepository;
    ShoeVariantRepository shoeVariantRepository;
    CustomerOrderRepository orderRepository;
    OrderDetailRepository orderDetailRepository;
    DiscountRepository discountRepository;


    public OrderResponse createOrder(OrderRequest request) {

        CustomerOrder newOrder = orderMapper.toCustomerOrder(request);
        newOrder.setOrderDate(Instant.now());
        newOrder.setOrderStatus(OrderConstants.OrderStatus.PENDING);

        if (request.getDiscountId() != null) {

            Discount discount = discountRepository.findById(request.getDiscountId())
                    .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));

            newOrder.setDiscount(discount);
        }

        User userOrder = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        newOrder.setUser(userOrder);

        CustomerOrder savedOrder = orderRepository.save(newOrder);
        CustomerOrder finalSavedOrder = savedOrder;

        if (finalSavedOrder.getId() == null) {
            throw new AppException(ErrorCode.ORDER_SAVE_ERROR);
        }


        List<OrderDetail> orderDetails = request.getItems().stream()
                .map(cartItem -> {
                    String variantId = cartItem.getVariantId();
                    ShoeVariant variant = shoeVariantRepository.findById(variantId)
                            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

                    int newQuantity = variant.getStockQuantity() - cartItem.getQuantity();
                    if (newQuantity < 0) {
                        throw new AppException(ErrorCode.INSUFFICIENT_INVENTORY);
                    }

                    variant.setStockQuantity(newQuantity);
                    shoeVariantRepository.save(variant);

                    OrderDetailId orderDetailId = new OrderDetailId(finalSavedOrder.getId(), variantId);

                    OrderDetail orderDetail = OrderDetail.builder()
                            .id(orderDetailId)
                            .order(finalSavedOrder)
                            .variant(variant)
                            .price(cartItem.getPrice())
                            .quantity(cartItem.getQuantity())
                            .build();
                    return orderDetailRepository.save(orderDetail);
                }).collect(Collectors.toList());


        savedOrder.setOrderDetails(orderDetails);
        savedOrder = orderRepository.save(savedOrder);

        List<CartItemResponse> cartItemsResponse = savedOrder.getOrderDetails().stream()
                .map(item -> CartItemResponse.builder()
                        .quantity(item.getQuantity())
                        .productId(item.getQuantity())
                        .price(item.getPrice())
                        .variantId(item.getVariant().getId())
                        .build())
                .toList();


        OrderResponse orderResponse = orderMapper.toOrderResponse(savedOrder);

        orderResponse.setItems(cartItemsResponse);

        return orderResponse;
    }

    public boolean couponIsExpired(Discount discount) {
        Date currentdate = new Date();
        Date expirationDate = Date.from(discount.getEndDate());
        return currentdate.after(expirationDate);
    }

    public ApplyDiscountResponse applyDiscount(String code) {
        Discount discount = discountRepository.findByCode(code)
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));

        // Kiểm tra nếu mã giảm giá không hoạt động
        if (!discount.isActive()) {
            throw new ValidationException("Discount is not active");
        }

        // Kiểm tra nếu mã giảm giá đã hết hạn
        if (couponIsExpired(discount)) {
            throw new ValidationException("Discount has expired");
        }


        ApplyDiscountResponse response = new ApplyDiscountResponse();
        response.setId(discount.getId());
        response.setCoupon(discount.getCode());
        response.setActive(discount.isActive());
        response.setMinimumOrderAmount(discount.getMinimumOrderAmount());
        if (discount.getDiscountType() == DiscountConstants.DiscountType.PERCENTAGE) {
            response.setPercentage(discount.getPercentage());
            response.setDiscountType(DiscountConstants.DiscountType.PERCENTAGE);
        } else if (discount.getDiscountType() == DiscountConstants.DiscountType.FIXED_AMOUNT) {
            response.setFixedAmount(discount.getFixedAmount());
            response.setDiscountType(DiscountConstants.DiscountType.FIXED_AMOUNT);
        }

        return response;
    }

    public CustomerOrder getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

    public CustomerOrder updateStatus(String id, OrderConstants.OrderStatus status, PaymentDetail paymentDetail) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        order.setOrderStatus(status);
        order.setPaymentDetail(paymentDetail);
        order.setUpdateDate(Instant.now());

        return orderRepository.save(order);
    }
}
