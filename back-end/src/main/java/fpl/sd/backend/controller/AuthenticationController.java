package fpl.sd.backend.controller;


import com.nimbusds.jose.JOSEException;
import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.request.AuthenticationRequest;
import fpl.sd.backend.dto.request.IntrospectRequest;
import fpl.sd.backend.dto.response.AuthenticationResponse;
import fpl.sd.backend.dto.response.IntrospectResponse;
import fpl.sd.backend.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;


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
}
