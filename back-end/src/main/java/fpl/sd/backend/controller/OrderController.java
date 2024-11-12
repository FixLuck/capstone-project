package fpl.sd.backend.controller;

import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.request.ApplyDiscountRequest;
import fpl.sd.backend.dto.request.OrderRequest;
import fpl.sd.backend.dto.response.OrderDto;
import fpl.sd.backend.dto.response.OrderResponse;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.service.OrderService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/orders")
public class OrderController {
    OrderService orderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@RequestBody @Valid OrderRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .code(200)
                .flag(true)
                .message("Order created")
                .result(orderService.createOrder(request))
                .build();

    }

//    @GetMapping("/{userId}/{coupon}")
//    public ApiResponse<?> applyCoupon(@PathVariable String userId, @PathVariable String coupon) {
//        try {
//            OrderDto orderDto = orderService.applyDiscount(userId, coupon);
//            return ApiResponse.<OrderDto>builder()
//                    .code(200)
//                    .flag(true)
//                    .message("Apply Successfully")
//                    .result(orderDto)
//                    .build();
//        } catch (ValidationException ex) {
//            return ApiResponse.builder()
//                    .code(400)
//                    .flag(false)
//                    .message("Discount has expired")
//                    .build();
//        } catch (AppException ex) {
//            return ApiResponse.builder()
//                    .code(404)
//                    .flag(false)
//                    .message(ex.getMessage())
//                    .build();
//        }
//    }

    @PostMapping("/apply-discount")
    public ApiResponse<?> applyDiscount(@RequestBody @Valid ApplyDiscountRequest request) {
        try {
            OrderDto orderDto = orderService.applyDiscount(request.getUserId(), request.getOrderId(),request.getDiscount());
            return ApiResponse.<OrderDto>builder()
                    .code(200)
                    .flag(true)
                    .message("Apply successfully")
                    .result(orderDto)
                    .build();
        } catch (ValidationException ex) {
            return ApiResponse.builder()
                    .code(400)
                    .flag(false)
                    .message("Discount has expired")
                    .build();
        } catch (AppException ex) {
            return ApiResponse.builder()
                    .code(404)
                    .flag(false)
                    .message(ex.getMessage())
                    .build();
        }
    }


}
