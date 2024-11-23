package fpl.sd.backend.service;


import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.response.CartItemResponse;
import fpl.sd.backend.dto.response.OrderDetailResponse;
import fpl.sd.backend.entity.CustomerOrder;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.repository.CustomerOrderRepository;
import fpl.sd.backend.repository.OrderDetailRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderDetailService {
    CustomerOrderRepository orderRepository;

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

    private OrderDetailResponse mapToOrderDetailResponse(CustomerOrder order) {
        OrderDetailResponse response = new OrderDetailResponse();
        response.setId(order.getId());
        response.setOrderDate(order.getOrderDate());
        response.setFinalTotal(order.getFinalTotal());
        response.setOrderStatus(order.getOrderStatus());

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
