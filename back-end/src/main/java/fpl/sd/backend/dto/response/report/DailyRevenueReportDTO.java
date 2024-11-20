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
public class DailyRevenueReportDTO {

    Instant saleDate;
    Integer totalOrders;
    BigDecimal totalDiscounts;
    BigDecimal totalRevenue;
    BigDecimal averageOrderValue;

}
