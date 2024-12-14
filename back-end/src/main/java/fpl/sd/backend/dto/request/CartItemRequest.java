package fpl.sd.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CartItemRequest {
    @NotBlank(message = "Variant ID is mandatory")
    String variantId;

    @Min(value = 1, message = "Quantity must be at least 1")
    int quantity;
    double price;
    int productId;

}
