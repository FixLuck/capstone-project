package fpl.sd.backend.service;

import fpl.sd.backend.dto.request.PaymentCallbackRequest;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Service
@Slf4j
public class PaymentValidationService {
    public void validatePaymentSignature(PaymentCallbackRequest request, String secretKey) {
        Map<String, String> params = new HashMap<>(request.getParameters());
        params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");

        String calculatedHash = calculateHash(params, secretKey);

        if (!calculatedHash.equals(request.getSecureHash())) {
            throw new AppException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public boolean validatePaymentStatus(String responseCode, String transactionStatus) {
        return "00".equals(responseCode) && "00".equals(transactionStatus);
    }

    private String calculateHash(Map<String, String> params, String secretKey) {
        try {
            // Sort parameters
            Map<String, String> sortedParams = new TreeMap<>(params);

            // Create hash data
            StringBuilder hashData = new StringBuilder();
            for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
                hashData.append(entry.getKey())
                        .append("=")
                        .append(entry.getValue())
                        .append("&");
            }

            // Remove last '&'
            if (!hashData.isEmpty()) {
                hashData.setLength(hashData.length() - 1);
            }

            // Calculate HMAC-SHA512
            Mac hmacSha512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                    secretKey.getBytes(),
                    "HmacSHA512"
            );
            hmacSha512.init(secretKeySpec);
            byte[] hmacData = hmacSha512.doFinal(hashData.toString().getBytes());
            return Hex.encodeHexString(hmacData);

        } catch (Exception e) {
            throw new AppException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
