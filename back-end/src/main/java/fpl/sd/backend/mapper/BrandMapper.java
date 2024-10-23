package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.BrandCreateRequest;
<<<<<<< HEAD
import fpl.sd.backend.dto.response.BrandResponse;
=======
import fpl.sd.backend.dto.request.BrandResponse;
>>>>>>> dat-branch
import fpl.sd.backend.entity.Brand;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    Brand toBrand(BrandCreateRequest request);

    BrandResponse toBrandResponse(Brand brand);
}
