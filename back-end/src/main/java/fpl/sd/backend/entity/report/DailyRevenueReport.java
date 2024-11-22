package fpl.sd.backend.entity.report;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "daily_revenue_report")
@Immutable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DailyRevenueReport {
    @Id
    Instant saleDate;
    Integer totalOrders;
    BigDecimal totalDiscounts;
    BigDecimal totalRevenue;
    BigDecimal averageOrderValue;

}
