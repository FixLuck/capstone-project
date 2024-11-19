package fpl.sd.backend.dto.request;

import fpl.sd.backend.constant.DiscountConstants;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;


import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountUpdateRequest {
    Double percentage;

    Instant startDate;

    Instant endDate;

    String code;

    String description;

    Double minimumOrderAmount ;

    Double fixedAmount;

    DiscountConstants.DiscountType discountType;

    Boolean active;
}
