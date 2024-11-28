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
    USER_NOT_FOUND(404, "User Not Found", HttpStatus.NOT_FOUND),
    USER_ALREADY_EXISTS(409, "User Already Exists", HttpStatus.CONFLICT),
    UNCAUGHT_EXCEPTION(500, "Uncaught Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    USERNAME_INVALID(400, "Username must be at least 3 characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(400, "Password must be at least 8 characters", HttpStatus.BAD_REQUEST),
    INVALID_KEY(999, "Invalid Message Key", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(401, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(403, "You do not have permissions", HttpStatus.FORBIDDEN),
    EMAIL_ALREADY_EXISTS(409, "Email Already Exists", HttpStatus.CONFLICT),
    ACCOUNT_DISABLED(401, "Account is disabled", HttpStatus.CONFLICT),


    // Brand-related errors
    BRAND_NOT_FOUND(404, "Brand Not Found", HttpStatus.NOT_FOUND),
    BRAND_ALREADY_EXISTS(409, "Brand Already Exists", HttpStatus.CONFLICT),
    BRAND_NAME_INVALID(400, "Brand name must not be empty", HttpStatus.BAD_REQUEST),
    BRAND_DESCRIPTION_TOO_LONG(400, "Brand description is too long", HttpStatus.BAD_REQUEST),
    BRAND_LOGO_INVALID(400, "Invalid Brand Logo URL", HttpStatus.BAD_REQUEST),
    BRAND_INACTIVE(403, "This brand is inactive", HttpStatus.FORBIDDEN),
    SKU_ALREADY_EXISTS(500, "Sku Already Exists", HttpStatus.CONFLICT),


    //Role-related errors
    ROLE_ALREADY_EXISTS(409, "Role already exists", HttpStatus.CONFLICT),
    ROLE_NOT_FOUND(404, "Role dont exists", HttpStatus.NOT_FOUND),

    //Product-related errors
    PRODUCT_NOT_FOUND(404, "Product Not Found", HttpStatus.NOT_FOUND),

    //Discount-related errors
    DISCOUNT_NOT_FOUND(404, "Discount Not Found", HttpStatus.NOT_FOUND),
    DISCOUNT_ALREADY_EXISTS(409, "Discount already exists", HttpStatus.CONFLICT),
    COUPON_INVALID(400, "Invalid Coupon", HttpStatus.BAD_REQUEST),
    MINIMUM_AMOUNT_NOT_MET(400, "The order total does not meet the minimum amount required for this discount.", HttpStatus.BAD_REQUEST),
    INVALID_DATE_RANGE (400, "Invalid Date Range", HttpStatus.BAD_REQUEST),
    //Order-related errors
    ORDER_SAVE_ERROR(500, "Order Save Error", HttpStatus.INTERNAL_SERVER_ERROR),

    ORDER_NOT_FOUND(404,"Order not found" ,HttpStatus.NOT_FOUND),

    //Quantity-related errors
    INSUFFICIENT_INVENTORY(404, "Insufficient inventory", HttpStatus.SERVICE_UNAVAILABLE),

    //Create Payment Url
    INTERNAL_SERVER_ERROR(500, "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR),
    PAYMENT_ALREADY_PROCESSED(500, "Payment already processed", HttpStatus.CONFLICT),

    ;



    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

}
