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

        User userOrder = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        newOrder.setUser(userOrder);

       CustomerOrder savedOrder = orderRepository.save(newOrder);
        CustomerOrder finalSavedOrder = savedOrder;

        if (finalSavedOrder.getId() == null) {
            throw new AppException(ErrorCode.ORDER_SAVE_ERROR);
        }


        List<OrderDetail> orderDetails = request.getCartItems().stream()
                .map(cartItem -> {
                    String variantId = cartItem.getVariantId();
                    ShoeVariant variant = shoeVariantRepository.findById(variantId)
                            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

                    OrderDetailId orderDetailId = new OrderDetailId(finalSavedOrder.getId(), variantId);

                    OrderDetail orderDetail = OrderDetail.builder()
                            .id(orderDetailId)
                            .order(finalSavedOrder)
                            .variant(variant)
                            .quantity(cartItem.getQuantity())
                            .build();
                    return orderDetailRepository.save(orderDetail);
                }).collect(Collectors.toList());



        savedOrder.setOrderDetails(orderDetails);
        savedOrder = orderRepository.save(savedOrder);

        List<CartItemResponse> cartItemsResponse = savedOrder.getOrderDetails().stream()
                .map(item -> CartItemResponse.builder()
                        .quantity(item.getQuantity())
                        .variantId(item.getVariant().getId())
                        .build())
                .toList();


        OrderResponse orderResponse = orderMapper.toOrderResponse(savedOrder);
        orderResponse.setCartItems(cartItemsResponse);
        return orderResponse;
    }

    public boolean couponIsExpired(Discount discount ) {
        Date currentdate = new Date();
        Date expirationDate = Date.from(discount.getEndDate());
        return currentdate.after(expirationDate);
    }


//    public OrderDto applyDiscount(String userId,String orderId, String code) {
//        CustomerOrder order = orderRepository.findByIdAndUserIdAndOrderStatus(orderId,userId, OrderConstants.OrderStatus.PENDING)
//                .orElseThrow(()-> new AppException(ErrorCode.ORDER_NOT_FOUND));
//        Discount discount = discountRepository.findByCode(code)
//                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));
//
//        if(couponIsExpired(discount)) {
//            throw new ValidationException("Discount has been expired");
//        }
//
//        if(discount.getMinimumOrderAmount() > order.getOriginalTotal()){
//                throw new AppException(ErrorCode.MINIMUM_AMOUNT_NOT_MET);
//            }
//
//        double discountAmount = 0.0;
//        double finalTotal;
//        if(discount.getDiscountType() == DiscountConstants.DiscountType.PERCENTAGE){
//            discountAmount = ((discount.getPercentage()/100.0) * order.getOriginalTotal());
//        }else if(discount.getDiscountType() == DiscountConstants.DiscountType.FIXED_AMOUNT){
//            discountAmount = discount.getFixedAmount();
//        }
//
//        finalTotal = order.getOriginalTotal() - discountAmount;
//
//        order.setFinalTotal(finalTotal);
//        order.setDiscountAmount(discountAmount);
//        order.setDiscount(discount);
//
//        orderRepository.save(order);
//        return order.getOrderDto();
//    }
public ApplyDiscountResponse applyDiscount(String code){
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
    response.setCoupon(discount.getCode());
    response.setActive(discount.isActive());
    response.setMinimumOrderAmount(discount.getMinimumOrderAmount());
    if(discount.getDiscountType() == DiscountConstants.DiscountType.PERCENTAGE){
        response.setPercentage(discount.getPercentage());
        response.setDiscountType(DiscountConstants.DiscountType.PERCENTAGE);
    } else if(discount.getDiscountType()== DiscountConstants.DiscountType.FIXED_AMOUNT){
        response.setFixedAmount(discount.getFixedAmount());
        response.setDiscountType(DiscountConstants.DiscountType.FIXED_AMOUNT);
    }

    return response;
}
}
