package fpl.sd.backend.dto.request;

import fpl.sd.backend.constant.OrderConstants;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderUpdateRequest {
    String username;
    Double finalTotal;
    OrderConstants.OrderStatus orderStatus;
    Instant orderDate;

}
