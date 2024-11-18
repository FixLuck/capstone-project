package fpl.sd.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor

public enum ErrorCode {

    // User-related errors
    USER_NOT_FOUND(404, "Không tìm thấy người dùng", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS(409, "Người dùng đã tồn tại", HttpStatus.CONFLICT),
    UNCAUGHT_EXCEPTION(500, "Lỗi không bắt được", HttpStatus.INTERNAL_SERVER_ERROR),
    USERNAME_INVALID(400, "Tên người dùng phải có ít nhất 3 ký tự", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(400, "Mật khẩu phải có ít nhất 8 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_KEY(999, "Khóa thông điệp không hợp lệ", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(401, "Chưa xác thực", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(403, "Bạn không có quyền truy cập", HttpStatus.FORBIDDEN),
    EMAIL_ALREADY_EXISTS(409, "Email đã tồn tại", HttpStatus.CONFLICT),
    ACCOUNT_DISABLED(401, "Tài khoản đã bị vô hiệu hóa", HttpStatus.CONFLICT),

    // Brand-related errors
    BRAND_NOT_FOUND(404, "Không tìm thấy thương hiệu", HttpStatus.NOT_FOUND),
    BRAND_ALREADY_EXISTS(409, "Thương hiệu đã tồn tại", HttpStatus.CONFLICT),
    BRAND_NAME_INVALID(400, "Tên thương hiệu không được để trống", HttpStatus.BAD_REQUEST),
    BRAND_DESCRIPTION_TOO_LONG(400, "Mô tả thương hiệu quá dài", HttpStatus.BAD_REQUEST),
    BRAND_LOGO_INVALID(400, "URL logo thương hiệu không hợp lệ", HttpStatus.BAD_REQUEST),
    BRAND_INACTIVE(403, "Thương hiệu này không hoạt động", HttpStatus.FORBIDDEN),
    SKU_ALREADY_EXISTS(500, "Mã sản phẩm (SKU) đã tồn tại", HttpStatus.CONFLICT),

    // Role-related errors
    ROLE_ALREADY_EXISTS(409, "Vai trò đã tồn tại", HttpStatus.CONFLICT),

    // Product-related errors
    PRODUCT_NOT_FOUND(404, "Không tìm thấy sản phẩm", HttpStatus.NOT_FOUND),

    // Discount-related errors
    DISCOUNT_NOT_FOUND(404, "Không tìm thấy khuyến mãi", HttpStatus.NOT_FOUND),
    DISCOUNT_ALREADY_EXISTS(409, "Khuyến mãi đã tồn tại", HttpStatus.CONFLICT),
    COUPON_INVALID(400, "Mã giảm giá không hợp lệ", HttpStatus.BAD_REQUEST),
    MINIMUM_AMOUNT_NOT_MET(400, "Tổng đơn hàng chưa đủ số tiền tối thiểu cho khuyến mãi", HttpStatus.BAD_REQUEST),
    
    // Order-related errors
    ORDER_SAVE_ERROR(500, "Lỗi lưu đơn hàng", HttpStatus.INTERNAL_SERVER_ERROR),

    ORDER_NOT_FOUND(404,"Không tìm thấy đơn hàng", HttpStatus.NOT_FOUND),

    // Quantity-related errors
    INSUFFICIENT_INVENTORY(404, "Không đủ hàng trong kho", HttpStatus.SERVICE_UNAVAILABLE),

    // Create Payment Url
    INTERNAL_SERVER_ERROR(500, "Lỗi máy chủ nội bộ", HttpStatus.INTERNAL_SERVER_ERROR),
    PAYMENT_ALREADY_PROCESSED(500, "Thanh toán đã được xử lý", HttpStatus.CONFLICT),
    
    ;

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
