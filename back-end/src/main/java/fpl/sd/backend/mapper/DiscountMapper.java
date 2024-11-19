package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.DiscountCreateRequest;
import fpl.sd.backend.dto.request.DiscountUpdateRequest;
import fpl.sd.backend.dto.response.DiscountResponse;
import fpl.sd.backend.entity.Discount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface DiscountMapper {

    Discount toDiscount(DiscountCreateRequest request);


    

//    @Mapping(source = "active", target = "isActive")
    DiscountResponse toDiscountResponse (Discount discount);

    @Mapping(source = "active", target = "isActive")
    Discount toDiscount (DiscountUpdateRequest request);

    @Mapping(source = "startDate", target = "startDate", qualifiedByName = "instantToString")
    @Mapping(source = "endDate", target = "endDate", qualifiedByName = "instantToString")
    @Named("instantToString")
    default String mapInstantToString(Instant instant) {
        if (instant == null) return null;
        return DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")
                .withZone(ZoneId.systemDefault())
                .format(instant);
    }


}
