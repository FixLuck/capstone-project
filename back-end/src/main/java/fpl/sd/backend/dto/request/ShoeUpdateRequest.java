package fpl.sd.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShoeUpdateRequest {
    String name;
    double price;
    boolean status;
    double fakePrice;
    String gender;
    String category;
    String description;
    List<VariantUpdateRequest> variants;
}
