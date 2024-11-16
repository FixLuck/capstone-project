package fpl.sd.backend.configuration;

import fpl.sd.backend.utils.VNPayUtils;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VNPayConfig {

    @Value("${vnPay.version}")
    String vnpVersion;

    @Value("${vnPay.command}")
    String vnpCommand;

    @Value("${vnPay.orderType}")
    String vnpOrderType;

    @Value("${vnPay.currCode}")
    String vnpCurrCode;

    @Getter
    @Value("${vnPay.hash-secret}")
    String vnpHashSecret;

    @Value("${vnPay.tmn-code}")
    String vnpTmnCode;

    @Getter
    @Value("${vnPay.payment-url}")
    String vnpPayUrl;

    @Value("${vnPay.return-url}")
    String vnpReturnUrl;

    public Map<String, String> getVNPayConfig() {
        Map<String, String> vnpParams = new HashMap<>();
        vnpParams.put("vnp_Version", vnpVersion);
        vnpParams.put("vnp_Command", vnpCommand);
        vnpParams.put("vnp_TmnCode", vnpTmnCode);
        vnpParams.put("vnp_CurrCode", vnpCurrCode);
        vnpParams.put("vnp_TxnRef", VNPayUtils.getRandomNumber(8));
        vnpParams.put("vnp_OrderType", vnpOrderType);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_ReturnUrl", vnpReturnUrl);
        vnpParams.put("vnp_CreateDate", VNPayUtils.getCreateDate());
        vnpParams.put("vnp_ExpireDate", VNPayUtils.getExpireDate());
        vnpParams.put("vnp_BankCode", "NCB");
        return vnpParams;
    }
}
