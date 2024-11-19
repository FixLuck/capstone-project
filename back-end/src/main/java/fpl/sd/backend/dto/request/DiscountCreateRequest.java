package fpl.sd.backend.dto.request;


import fpl.sd.backend.constant.DiscountConstants;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountCreateRequest {
    @DecimalMin(value = "0.0",inclusive = false, message = "Percentage must be greater than 0")
    @DecimalMax(value = "100.0", message = "Percentage cannot exceed 100")


    Double percentage;

    @NotNull(message = "Start date is mandatory")
    Instant startDate;

    @NotNull(message = "End date is mandatory")
    Instant endDate;

    @NotBlank(message = "Discount code is mandatory")
    String code;



    @DecimalMin(value = "0.0", inclusive = true, message = "Minimum order amount must be greater than 0")
    Double minimumOrderAmount = 0.0;  // Giữ giá trị mặc định là 0




    @NotBlank(message = "Description is mandatory")
    String description;

    @DecimalMin(value = "0.0", inclusive = false, message = "FixedAmount must be greater than 0")

    Double fixedAmount;


    @NotNull(message = "DiscountType is mandatory")
    DiscountConstants.DiscountType discountType;
}
