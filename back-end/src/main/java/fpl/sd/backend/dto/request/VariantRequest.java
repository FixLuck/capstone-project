package fpl.sd.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VariantRequest {
    int sizeId;
    int stockQuantity;
    int shoeId;
    String variantId;
}
