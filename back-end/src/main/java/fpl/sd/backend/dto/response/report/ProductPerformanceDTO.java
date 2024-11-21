package fpl.sd.backend.dto.response.report;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductPerformanceDTO {

    String shoeName;
    String category;
    String gender;
    String brandName;
    Integer totalOrders;
    Integer totalUnitsSold;
    BigDecimal totalRevenue;
    BigDecimal averageSellingPrice;
}
