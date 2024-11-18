package fpl.sd.backend.dto.response;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.entity.PaymentDetail;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    PaymentDetail paymentDetail;
    OrderConstants.OrderStatus orderStatus;
}
