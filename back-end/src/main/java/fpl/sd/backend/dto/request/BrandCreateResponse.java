package fpl.sd.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BrandCreateResponse {
    int brandId;
    String brandName;
    String createAt;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    String description;
    String logoUrl;
    boolean isActive;

}
