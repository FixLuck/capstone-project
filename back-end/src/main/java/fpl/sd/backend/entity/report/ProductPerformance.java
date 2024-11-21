package fpl.sd.backend.entity.report;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Table(name = "product_performance")
@Immutable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductPerformance {
    @Id
    String shoeName;
    String category;
    String gender;
    String brandName;
    Integer totalOrders;
    Integer totalUnitsSold;
    BigDecimal totalRevenue;
    BigDecimal averageSellingPrice;
}
