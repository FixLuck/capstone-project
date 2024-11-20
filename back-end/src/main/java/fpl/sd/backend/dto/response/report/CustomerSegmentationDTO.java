package fpl.sd.backend.dto.response.report;

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
