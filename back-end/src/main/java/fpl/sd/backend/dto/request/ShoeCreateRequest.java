package fpl.sd.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;


import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShoeCreateRequest {
    String name;
    double price;
    String description;
    boolean status;
    double fakePrice;
    String gender;
    String category;
    int brandId;

    List<ImageRequest> images;
    List<VariantRequest> variants;
}
