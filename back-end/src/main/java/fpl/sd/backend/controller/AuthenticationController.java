package fpl.sd.backend.controller;


import com.nimbusds.jose.JOSEException;
import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.request.*;
import fpl.sd.backend.dto.response.AuthenticationResponse;
import fpl.sd.backend.dto.response.IntrospectResponse;
import fpl.sd.backend.service.AuthenticationService;
import fpl.sd.backend.service.EmailService;
import fpl.sd.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173"})
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    UserService userService;
    EmailService emailService;


    @PostMapping("/token")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        var rs = authenticationService.authenticate(authenticationRequest);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(rs)
                .flag(true)
                .message("Login successful")
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var rs = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(rs)
                .build();
    }

    @PostMapping("/change-password")
    public ApiResponse<Void> changePassword(@Valid @RequestBody PasswordChangeRequest request) {
        userService.changePassword(request);
        return ApiResponse.<Void>builder()
                .flag(true)
                .message("Password changed successfully")
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Successfully logged out.")
                .result(null)
                .build();
    }

    @PostMapping("/email/send")
    public ApiResponse<Void> sendEmail(@RequestBody PasswordResetRequest email) {
        emailService.requestPasswordReset(email);
        return ApiResponse.<Void>builder()
                .flag(true)
                .message("Successfully send email.")
                .result(null)
                .build();
    }

    @PostMapping("/verify-otp")
    public ApiResponse<Void> verifyOtp(@RequestBody OTPVerificationRequest request) {
        boolean isVerified = userService.verifyOtp(request.getEmail(), request.getOtpCode());
        if (isVerified) {
            return ApiResponse.<Void>builder()
                    .flag(true)
                    .message("Successfully verified OTP.")
                    .build();
        } else {
            return ApiResponse.<Void>builder()
                    .flag(false)
                    .message("Invalid or expired OTP.")
                    .code(400)
                    .build();
        }
    }

    @PostMapping("/reset-password")
    public ApiResponse<Void> resetPassword(@RequestBody OTPVerificationRequest request) {
        boolean isReset = userService.resetPassword(request.getEmail(), request.getNewPassword(), request.getConfirmPassword());
        if (isReset) {
            return ApiResponse.<Void>builder()
                    .flag(true)
                    .message("Reset password successful.")
                    .build();
        } else {
            return ApiResponse.<Void>builder()
                    .flag(false)
                    .message("Reset password failed.")
                    .code(400)
                    .build();
        }
    }
}
