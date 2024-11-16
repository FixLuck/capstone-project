package fpl.sd.backend.service;

import fpl.sd.backend.configuration.VNPayConfig;
import fpl.sd.backend.dto.request.PaymentRequest;
import fpl.sd.backend.entity.CustomerOrder;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.utils.VNPayUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentService {
    VNPayConfig vnPayConfig;
    OrderService orderService;

    public String createPayment(String orderId, String ipAddress) {
        try {
            CustomerOrder order = orderService.getOrderById(orderId);
            if (order == null) {
                throw new AppException(ErrorCode.ORDER_NOT_FOUND);
            }

            long amount = (long) (order.getFinalTotal() * 100L);

            Map<String, String> vnpParams = vnPayConfig.getVNPayConfig();
            vnpParams.put("vnp_Amount", String.valueOf(amount));
            vnpParams.put("vnp_OrderInfo", order.getId());
            vnpParams.put("vnp_IpAddr", ipAddress);

            String queryUrl = VNPayUtils.generateQueryUrl(vnpParams, true);
            String hashData =VNPayUtils.generateQueryUrl(vnpParams, false);
            String vnpSecureHash = VNPayUtils.hmacSHA512(vnPayConfig.getVnpHashSecret(), hashData);
            queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
            return vnPayConfig.getVnpPayUrl() + "?" + queryUrl;
        } catch (AppException e) {
            throw new AppException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }


}
