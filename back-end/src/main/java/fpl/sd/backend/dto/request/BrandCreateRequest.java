package fpl.sd.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BrandCreateRequest {
    @NotBlank(message = "Brand name is mandatory")
    String brandName;
    String description;
    @NotBlank(message = "Logo url is mandatory")
    String logoUrl;

}
