package fpl.sd.backend.dto.response.report;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomerSegmentationDTO {
    String customerId;
    String fullName;
    Integer totalOrders;
    BigDecimal totalSpent;
    BigDecimal averageOrderValue;
    Instant firstOrderDate;
    Instant lastOrderDate;
    Integer customerLifetimeDays;

}
