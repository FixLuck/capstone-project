package fpl.sd.backend.entity.report;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Table(name = "discount_effectiveness")
@Immutable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountEffectiveness {
    @Id
    String discountCode;
    String discountType;
    Integer timesUsed;
    BigDecimal totalDiscountAmount;
    BigDecimal totalRevenueAfterDiscount;
    BigDecimal totalRevenueBeforeDiscount;
    BigDecimal averageDiscountAmount;
    BigDecimal discountPercentage;
}
