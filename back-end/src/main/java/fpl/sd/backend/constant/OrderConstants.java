package fpl.sd.backend.constant;

import fpl.sd.backend.dto.response.EnumResponse;

import java.util.Arrays;
import java.util.List;

public class OrderConstants {
    public enum OrderStatus {
        PENDING, RECEIVED, CANCELED, PAID, PAYMENT_FAILED, SHIPPED
    }
    public static OrderConstants.OrderStatus getOrderStatusFromString(String orderStatusString) {
        for (OrderConstants.OrderStatus orderStatus : OrderConstants.OrderStatus.values()) {
            if (orderStatus.name().equalsIgnoreCase(orderStatusString)) {
                return orderStatus;
            }
        }
        return null;
    }
    public static List<EnumResponse> getAllOrderStatusResponses() {
        return Arrays.stream(OrderConstants.OrderStatus.values())
                .map(orderStatus -> new EnumResponse(orderStatus.name(), orderStatus.name().toLowerCase()))
                .toList();
    }
}
