package fpl.sd.backend.service;


import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import fpl.sd.backend.dto.request.AuthenticationRequest;
import fpl.sd.backend.dto.request.IntrospectRequest;
import fpl.sd.backend.dto.request.LogoutRequest;
import fpl.sd.backend.dto.request.RefreshTokenRequest;
import fpl.sd.backend.dto.response.AuthenticationResponse;
import fpl.sd.backend.dto.response.IntrospectResponse;
import fpl.sd.backend.entity.InvalidatedToken;
import fpl.sd.backend.entity.User;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.repository.InvalidatedTokenRepository;
import fpl.sd.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;


    @NonFinal
    @Value("${jwt.signerKey}")
    protected String signerKey;

    @NonFinal
    @Value("${jwt.validDuration}")
    protected long validDuration;

    @NonFinal
    @Value("${jwt.refreshableDuration}")
    protected long refreshableDuration;


    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        String token = request.getToken();

//        JWSVerifier verifier = new MACVerifier(signerKey.getBytes());
//
//        SignedJWT signedJWT = SignedJWT.parse(token);
//
//        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
//
//        var verified = signedJWT.verify(verifier);


        boolean isValid = true;

        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = userRepository.findByUsername(authenticationRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword());

        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (!user.isActive()) {
            throw new AppException(ErrorCode.ACCOUNT_DISABLED);
        }

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();

    }

    private String generateToken(User user) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("superteam.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(validDuration, ChronoUnit.SECONDS).toEpochMilli())) //Thời hạn của token
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        try {
            jwsObject.sign(new MACSigner(signerKey.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Can not generate token", e);
            throw new RuntimeException(e);
        }
    }


    private String buildScope(User user) {
        return Optional.ofNullable(user.getRole())
                .map(role -> "ROLE_" + role.getRoles())
                .orElse("");
    }

    public void logout(LogoutRequest request) throws ParseException {
        try {
            var signToken = verifyToken(request.getToken(), true);

            String jti = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jti)
                    .expiryTime(expiryTime)
                    .build();

            invalidatedTokenRepository.save(invalidatedToken); //lưu token đã hết hạn vào db
        } catch (AppException | JOSEException e) {
            log.info("Token already expired", e);
        }
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest request) throws ParseException, JOSEException {
        // - Kiểm tra hiệu lực của token, nếu token sắp hết hiệu lực thì lưu nó vào db và loại bỏ nó
        var signJWT = verifyToken(request.getToken(), true);
        var jti = signJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jti)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.save(invalidatedToken);

        var username = signJWT.getJWTClaimsSet().getSubject();
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }


    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(signerKey);

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(refreshableDuration, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        // hàm này sẽ truyền vào 1 flag là isRefresh, nếu là true thì function sẽ refresh token, nếu fail thì nó sẽ xác thực token
        // nếu là refresh token thì thời gian hết hạn = thời gian tạo token + thời gian có thể refresh token đó

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        // đặt việc so sánh token logout từ trong db vì nếu token chưa đc verify thì sẽ bị chặn ở trên

        if (invalidatedTokenRepository
                .existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }


}




