package fpl.sd.backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {

    @PositiveOrZero(message = "Total amount must be positive or zero")
    double originalTotal;

    @PositiveOrZero(message = "Discount amount must be positive or zero")
    double discountAmount;

    @PositiveOrZero(message = "Final amount must be positive or zero")
    double finalTotal;

    @NotBlank(message = "User ID is required")
    String userId;
    int discountId;

    @NotNull(message = "Cart items cannot be null")
    @Size(min = 1, message = "At least one cart item is required")
    @Valid
    List<CartItemRequest> cartItems;

}
