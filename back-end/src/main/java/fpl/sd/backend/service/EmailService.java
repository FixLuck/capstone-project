package fpl.sd.backend.service;

import fpl.sd.backend.dto.request.PasswordResetRequest;
import fpl.sd.backend.dto.request.mail.*;
import fpl.sd.backend.entity.User;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.repository.UserRepository;
import fpl.sd.backend.utils.EmailTemplate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    RestTemplate restTemplate;

    @Value("${mail.apiKey}")
    String apiKey;

    private static final String MAIL_URL = "https://api.brevo.com/v3/smtp/email";

    UserRepository userRepository;

    public void requestPasswordReset(PasswordResetRequest request) {

        String email = request.getEmail();

        Optional<User> userOpt = Optional.ofNullable(userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String otp = String.format("%06d", new Random().nextInt(999999));
            user.setOtpCode(otp);
            user.setOtpExpiryDate(LocalDateTime.now().plusMinutes(5));
            userRepository.save(user);


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);
            String htmlContent = EmailTemplate.generateEmailTemplate(otp);

            List<Recipient> recipients = Collections.singletonList(
                    Recipient.builder()
                            .name(user.getFullName())
                            .email(email)
                            .build()
            );

           try {
               EmailRequest emailRequest = EmailRequest.builder()
                       .sender(Sender.builder()
                               .name("SuperTeamShopShoe")
                               .email("ng.vanman1502@gmail.com")
                               .build())
                       .to(recipients)
                       .headers(Headers.builder()
                               .newKey("New Value")
                               .build())
                       .subject("SuperTeam Shop Shoe - Your Security Code")
                       .htmlContent(htmlContent)
                       .build();

               HttpEntity<EmailRequest> httpRequest = new HttpEntity<>(emailRequest, headers);

               restTemplate.postForObject(MAIL_URL, httpRequest, Void.class);
           } catch (HttpClientErrorException e) {
               String responseBody = e.getResponseBodyAsString();
               log.error("Email send error: Status {}, Body: {}", e.getStatusCode(), responseBody);
               throw new AppException(ErrorCode.SEND_MAIL_ERROR);
           }

        }


    }

}
