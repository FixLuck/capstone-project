package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.DiscountCreateRequest;
import fpl.sd.backend.dto.response.DiscountResponse;
import fpl.sd.backend.entity.Discount;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DiscountMapper {
    Discount toDiscount(DiscountCreateRequest request);

    DiscountResponse toDiscountResponse (Discount discount);
}
