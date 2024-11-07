package fpl.sd.backend.mapper;
import fpl.sd.backend.dto.request.BrandCreateRequest;
import fpl.sd.backend.dto.response.BrandResponse;
import fpl.sd.backend.entity.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    Brand toBrand(BrandCreateRequest request);

    @Mapping(target = "brandId", source = "id")
    BrandResponse toBrandResponse(Brand brand);
}
