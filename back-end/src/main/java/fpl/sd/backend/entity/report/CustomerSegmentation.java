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
@Table(name = "customer_segmentation")
@Immutable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerSegmentation {
    @Id
    String customerId;
    String fullName;
    Integer totalOrders;
    BigDecimal totalSpent;
    BigDecimal averageOrderValue;
    Instant firstOrderDate;
    Instant lastOrderDate;
    Integer customerLifetimeDays;

}
