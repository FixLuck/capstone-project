package fpl.sd.backend.exception;

import fpl.sd.backend.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException e) {
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .message(e.getMessage())
                .flag(false)
                .code(400)
                .build();
        return ResponseEntity.badRequest().body(apiResponse);

    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .message(Objects.requireNonNull(e.getFieldError()).getDefaultMessage())
                .flag(false)
                .code(400)
                .build();
        return ResponseEntity.badRequest().body(apiResponse);
    }
}
