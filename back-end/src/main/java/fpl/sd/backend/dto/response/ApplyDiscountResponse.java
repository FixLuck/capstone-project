package fpl.sd.backend.dto.response;


import fpl.sd.backend.constant.DiscountConstants;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplyDiscountResponse {
    int id;
    boolean active;
    String coupon;
    Double percentage;
    Double fixedAmount;
    DiscountConstants.DiscountType discountType;
    Double minimumOrderAmount ;
}
