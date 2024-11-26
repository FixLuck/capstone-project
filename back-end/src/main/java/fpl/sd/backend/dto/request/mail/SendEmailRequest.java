package fpl.sd.backend.dto.request.mail;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SendEmailRequest {
    Recipient to;
    String subject;
    String htmlContent;
}
