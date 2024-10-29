package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.ImageRequest;
import fpl.sd.backend.dto.response.ImageResponse;
import fpl.sd.backend.entity.ShoeImage;
import org.mapstruct.Mapper;



@Mapper(componentModel = "spring")
public interface ShoeImageMapper {

    ImageResponse toImageResponse(ShoeImage shoeImage);

    ShoeImage toShoeImage(ImageRequest request);
}
