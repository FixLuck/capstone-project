package fpl.sd.backend.dto.response.report;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InventoryStatusDTO {

    String sku;
    String shoeName;
    String category;
    String gender;
    String brandName;
    String sizeNumber;
    Integer currentStock;
    String stockStatus;
}
