package fpl.sd.backend.dto.request.mail;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailRequest {
    Sender sender;
    List<Recipient> to;
    String subject;
    Headers headers;
    String htmlContent;
}
