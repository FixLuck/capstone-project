package fpl.sd.backend.service;

import fpl.sd.backend.dto.request.PasswordResetRequest;
import fpl.sd.backend.dto.request.mail.EmailRequest;
import fpl.sd.backend.dto.request.mail.Recipient;
import fpl.sd.backend.dto.request.mail.SendEmailRequest;
import fpl.sd.backend.dto.request.mail.Sender;
import fpl.sd.backend.entity.User;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.repository.UserRepository;
import fpl.sd.backend.utils.EmailTemplate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    RestTemplate restTemplate;
    String apiKey = "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";
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

            String url = "https://api.brevo.com/v3/smtp/email";

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

            EmailRequest emailRequest = EmailRequest.builder()
                    .sender(Sender.builder()
                            .name("SuperTeamShopShoe")
                            .email("ng.vanman1502@gmail.com")
                            .build())
                    .to(recipients)
                    .subject("SuperTeam Shop Shoe - Your Security Code")
                    .htmlContent(htmlContent)
                    .build();

            HttpEntity<EmailRequest> httpRequest = new HttpEntity<>(emailRequest, headers);

            restTemplate.postForObject(url, httpRequest, Void.class);

        }


    }

}
