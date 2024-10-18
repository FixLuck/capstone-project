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

    // Brand-related errors
    BRAND_NOT_FOUND(404, "Brand Not Found", HttpStatus.NOT_FOUND),
    BRAND_ALREADY_EXISTS(409, "Brand Already Exists", HttpStatus.CONFLICT),
    BRAND_NAME_INVALID(400, "Brand name must not be empty", HttpStatus.BAD_REQUEST),
    BRAND_DESCRIPTION_TOO_LONG(400, "Brand description is too long", HttpStatus.BAD_REQUEST),
    BRAND_LOGO_INVALID(400, "Invalid Brand Logo URL", HttpStatus.BAD_REQUEST),
    BRAND_INACTIVE(403, "This brand is inactive", HttpStatus.FORBIDDEN),


    //Role-related errors
    ROLE_ALREADY_EXISTS(409, "Role already exists", HttpStatus.CONFLICT),
    ;

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

}
