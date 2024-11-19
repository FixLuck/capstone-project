package fpl.sd.backend.controller;

import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.response.OrderDetailResponse;
import fpl.sd.backend.entity.OrderDetail;
import fpl.sd.backend.service.OrderDetailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-details")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin("*")
public class OrderDetailController {
    OrderDetailService orderDetailService;

    @GetMapping("/user/{userId}")
    public ApiResponse<List<OrderDetailResponse>> getOrderDetailsByUserId(@PathVariable String userId) {
        return ApiResponse.<List<OrderDetailResponse>>builder()
                .code(200)
                .flag(true)
                .message("Successfully loaded")
                .result(orderDetailService.getAllOrdersByUserId(userId))
                .build();
    }

    @GetMapping
    public ApiResponse<List<OrderDetailResponse>> getOrderDetails() {
        return ApiResponse.<List<OrderDetailResponse>>builder()
                .code(200)
                .flag(true)
                .message("Successfully loaded")
                .result(orderDetailService.getAllOrderDetails())
                .build();
    }

    @GetMapping("/order/{orderId}")
    public ApiResponse<OrderDetailResponse> getOrderDetailByOrderId(@PathVariable String orderId) {
        return ApiResponse.<OrderDetailResponse>builder()
                .code(200)
                .flag(true)
                .message("Successfully loaded")
                .result(orderDetailService.getOrderById(orderId))
                .build();
    }

    @GetMapping("/order/{orderId}/user/{userId}")
    public ApiResponse<OrderDetailResponse> getOrderDetailByOrderIdAndUserId(@PathVariable String orderId, @PathVariable String userId) {
        return ApiResponse.<OrderDetailResponse>builder()
                .code(200)
                .flag(true)
                .message("Successfully loaded")
                .result(orderDetailService.getOrderByIdAndUserId(orderId, userId))
                .build();
    }
}
