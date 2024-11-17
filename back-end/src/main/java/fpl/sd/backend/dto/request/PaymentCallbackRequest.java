package fpl.sd.backend.dto.request;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentCallbackRequest {
    String secureHash;
    Map<String, String> parameters;
    String responseCode;
    String transactionStatus;
    String orderId;
    Long amount;
    String bankCode;
    String transactionNo;
    String paymentDate;
    String cardType;

    public static PaymentCallbackRequest from(HttpServletRequest request) {
        Map<String, String> params = new HashMap<>();
        request.getParameterMap().forEach((key, value) -> {
            if (value != null && value.length > 0) {
                params.put(key, value[0]);
            }
        });

        return PaymentCallbackRequest.builder()
                .secureHash(params.get("vnp_SecureHash"))
                .parameters(params)
                .responseCode(params.get("vnp_ResponseCode"))
                .transactionStatus(params.get("vnp_TransactionStatus"))
                .orderId(params.get("vnp_OrderInfo"))
                .amount(Long.parseLong(params.get("vnp_Amount")))
                .bankCode(params.get("vnp_BankCode"))
                .transactionNo(params.get("vnp_TransactionNo"))
                .paymentDate(params.get("vnp_PayDate"))
                .cardType(params.get("vnp_CardType"))
                .build();
    }
}
