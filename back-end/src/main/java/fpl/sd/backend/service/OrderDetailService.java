package fpl.sd.backend.service;


import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.request.DiscountUpdateRequest;
import fpl.sd.backend.dto.request.OrderUpdateRequest;
import fpl.sd.backend.dto.response.CartItemResponse;
import fpl.sd.backend.dto.response.DiscountResponse;
import fpl.sd.backend.dto.response.OrderDetailResponse;
import fpl.sd.backend.entity.CustomerOrder;
import fpl.sd.backend.entity.Discount;
import fpl.sd.backend.entity.OrderDetail;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.OrderMapper;
import fpl.sd.backend.repository.CustomerOrderRepository;
import fpl.sd.backend.repository.OrderDetailRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderDetailService {
    CustomerOrderRepository orderRepository;
    OrderDetailRepository orderDetailRepository;
    OrderMapper orderMapper;

    public List<OrderDetailResponse> getAllOrderDetails() {
        List<CustomerOrder> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderDetailResponse)
                .collect(Collectors.toList());
    }

    public OrderDetailResponse getOrderByIdAndUserId(String orderId, String userId) {
        CustomerOrder customerOrder = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        return mapToOrderDetailResponse(customerOrder);
    }
//  tìm kiếm bằng order id, user id, trạng thái đơn hàng
//    public OrderDetailResponse getOrderByIdAndUserIdAndStatus(String orderId, String userId, OrderConstants.OrderStatus status) {
//        CustomerOrder customerOrder = orderRepository.findByIdAndUserIdAndOrderStatus(orderId, userId, status)
//                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
//
//        return mapToOrderDetailResponse(customerOrder);
//    }

        public List<OrderDetailResponse> getAllOrdersByUserId(String userId) {
            List<CustomerOrder> customerOrders = orderRepository.findByUserId(userId);

            return customerOrders.stream()
                    .map(this::mapToOrderDetailResponse)
                    .collect(Collectors.toList());
        }

    public OrderDetailResponse getOrderById(String orderId) {
        CustomerOrder customerOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        return mapToOrderDetailResponse(customerOrder);
    }


    public OrderDetailResponse updateOrderDetail(String orderId, OrderUpdateRequest request) {
        CustomerOrder customerOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));


        if (request.getOrderDate() != null) {
            customerOrder.setOrderDate(request.getOrderDate());
        }

        if (request.getOrderStatus() != null) {
            customerOrder.setOrderStatus(request.getOrderStatus());
        }
        if (request.getFinalTotal() != null) {
            customerOrder.setFinalTotal(request.getFinalTotal());
        }

        orderRepository.save(customerOrder);
        return mapToOrderDetailResponse(customerOrder);
    }


    private OrderDetailResponse mapToOrderDetailResponse(CustomerOrder order) {
        OrderDetailResponse response = new OrderDetailResponse();
        response.setId(order.getId());
        response.setOrderDate(order.getOrderDate());
        response.setFinalTotal(order.getFinalTotal());
        response.setOrderStatus(order.getOrderStatus());
        response.setOriginalTotal(order.getOriginalTotal());

        // Gán giá trị username từ thực thể User
        if (order.getUser() != null) {
            response.setUsername(order.getUser().getUsername());
        }
        List<CartItemResponse> cartItemResponses = order.getOrderDetails().stream()
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
        response.setCartItems(cartItemResponses);
        return response;
    }


}
