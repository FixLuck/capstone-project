package fpl.sd.backend.service;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.request.OrderRequest;
import fpl.sd.backend.dto.response.CartItemResponse;
import fpl.sd.backend.dto.response.OrderResponse;
import fpl.sd.backend.entity.*;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.OrderMapper;
import fpl.sd.backend.repository.CustomerOrderRepository;
import fpl.sd.backend.repository.OrderDetailRepository;
import fpl.sd.backend.repository.ShoeVariantRepository;
import fpl.sd.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
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
}
