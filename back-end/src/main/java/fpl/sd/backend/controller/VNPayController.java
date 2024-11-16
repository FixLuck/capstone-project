package fpl.sd.backend.controller;

import fpl.sd.backend.configuration.VNPayConfig;
import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.request.PaymentRequest;
import fpl.sd.backend.service.PaymentService;
import fpl.sd.backend.utils.VNPayUtils;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VNPayController {
    private static final Logger log = LoggerFactory.getLogger(VNPayController.class);
    PaymentService paymentService;
    VNPayConfig vnPayConfig;

    @PostMapping("/create-payment")
   public ApiResponse<String> createPayment(@RequestBody PaymentRequest paymentRequest) {
        return ApiResponse.<String>builder()
                .flag(true)
                .message("Payment created successfully")
                .code(200)
                .result(paymentService.createPayment(paymentRequest.getOrderId(), paymentRequest.getIpAddress()))
                .build();
    }

    @GetMapping("/payment-callback")
   public ResponseEntity<String> getPaymentCallback(@RequestParam Map<String, String> queryParams) {
        try {
            // Extract vnp_SecureHash from query parameters
            String vnpSecureHash = queryParams.get("vnp_SecureHash");

            // Remove vnp_SecureHash from queryParams to validate checksum
            Map<String, String> validationParams = new TreeMap<>(queryParams);
            validationParams.remove("vnp_SecureHash");

            // Generate checksum from remaining parameters
            String checkSum = VNPayUtils.generateQueryUrl(validationParams, true);
            String calculatedHash = VNPayUtils.hmacSHA512(vnPayConfig.getVnpHashSecret(), checkSum);

            // Validate checksum
            if (!calculatedHash.equals(vnpSecureHash)) {
                return ResponseEntity.badRequest().body("Invalid checksum");
            }

            // Get payment status
            String status = queryParams.get("vnp_ResponseCode");
            String orderId = queryParams.get("vnp_TxnRef");

            // Update order status
            if ("00".equals(status)) {
                log.info("orderId: {}", orderId);
                return ResponseEntity.ok("Payment successful");
            } else {

                return ResponseEntity.ok("Payment failed");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payment callback: " + e.getMessage());
        }
    }
}

