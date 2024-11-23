package fpl.sd.backend.dto.response.report;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountEffectivenessDTO {

    String discountCode;
    String discountType;
    Integer timesUsed;
    BigDecimal totalDiscountAmount;
    BigDecimal totalRevenueAfterDiscount;
    BigDecimal totalRevenueBeforeDiscount;
    BigDecimal averageDiscountAmount;
    BigDecimal discountPercentage;
}
