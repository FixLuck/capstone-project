package fpl.sd.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VNPayResponse {
    String vnp_ResponseCode;     // Response code from VNPAY (00 = success)
    String vnp_TransactionNo;    // VNPAY's transaction number
    String vnp_BankCode;         // Payment method/Bank code
    String vnp_BankTranNo;
    String vnp_Amount;
    String vnp_PayDate;

    public boolean isSuccess() {
        return "00".equals(vnp_ResponseCode);
    }

    public long getActualAmount() {
        try {
            return Long.parseLong(vnp_Amount) / 100; // Convert back from VNPay amount format
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    public String getFormattedPayDate() {
        if (vnp_PayDate == null || vnp_PayDate.length() != 14) {
            return null;
        }
        try {
            // Format: yyyyMMddHHmmss to yyyy-MM-dd HH:mm:ss
            return vnp_PayDate.substring(0, 4) + "-" +
                    vnp_PayDate.substring(4, 6) + "-" +
                    vnp_PayDate.substring(6, 8) + " " +
                    vnp_PayDate.substring(8, 10) + ":" +
                    vnp_PayDate.substring(10, 12) + ":" +
                    vnp_PayDate.substring(12, 14);
        } catch (Exception e) {
            return null;
        }
    }

    public String getResponseMessage() {
        switch (vnp_ResponseCode) {
            case "00":
                return "Giao dịch thành công";
            case "07":
                return "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)";
            case "09":
                return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng";
            case "10":
                return "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
            case "11":
                return "Giao dịch không thành công do: Đã hết hạn chờ thanh toán";
            case "12":
                return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa";
            case "13":
                return "Giao dịch không thành công do: Khách hàng nhập sai mật khẩu xác thực giao dịch (OTP)";
            case "24":
                return "Giao dịch không thành công do: Khách hàng hủy giao dịch";
            case "51":
                return "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch";
            case "65":
                return "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày";
            case "75":
                return "Ngân hàng thanh toán đang bảo trì";
            case "79":
                return "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định";
            default:
                return "Giao dịch không thành công";
        }
    }




}
