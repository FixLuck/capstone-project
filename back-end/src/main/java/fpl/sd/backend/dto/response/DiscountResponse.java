package fpl.sd.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import fpl.sd.backend.constant.DiscountConstants;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DiscountResponse {
    Integer id;
    Double percentage;
    Instant startDate;
    Instant endDate;
    String code;
    Double minimumOrderAmount ;
    String description;
    Double fixedAmount;
    DiscountConstants.DiscountType discountType;
    boolean isActive ;
}
