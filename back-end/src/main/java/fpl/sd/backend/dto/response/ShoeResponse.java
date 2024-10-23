package fpl.sd.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import fpl.sd.backend.dto.request.ImageRequest;
import fpl.sd.backend.dto.request.VariantRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShoeResponse {
    String id;
    String name;
    Double price;
    String description;
    boolean status;
    Double fakePrice;
    Instant createdAt;
    Instant updatedAt;
    String gender;
    String category;

    List<ImageResponse> images;
    List<VariantResponse> variants;

}
