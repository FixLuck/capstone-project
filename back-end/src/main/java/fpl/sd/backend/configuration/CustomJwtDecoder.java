package fpl.sd.backend.configuration;

import com.nimbusds.jose.JOSEException;
import fpl.sd.backend.dto.request.IntrospectRequest;
import fpl.sd.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CustomJwtDecoder implements JwtDecoder {

    @Value("${jwt.signerKey}")
    private String signerKey;

    private final AuthenticationService authenticationService;
    private NimbusJwtDecoder nimbusJwtDecoder;


    @Override
    public Jwt decode(String token) throws JwtException {

        try {
            var response = authenticationService.introspect(IntrospectRequest
                    .builder()
                            .token(token)
                    .build());

            if (!response.isValid()) {
                throw new BadJwtException("Token is invalid");
            }
        } catch (JOSEException | ParseException e) {
            throw new JwtException(e.getMessage());
        }

        if (Objects.isNull(nimbusJwtDecoder)) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
            nimbusJwtDecoder = NimbusJwtDecoder
                    .withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }

        return nimbusJwtDecoder.decode(token);
    }
}
