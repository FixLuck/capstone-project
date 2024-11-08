package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.ShoeCreateRequest;
import fpl.sd.backend.dto.request.ShoeUpdateRequest;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.entity.Shoe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShoeMapper {

    ShoeResponse toShoeResponse(Shoe shoe);

    Shoe toShoe(ShoeCreateRequest request);
}
