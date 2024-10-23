package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.VariantRequest;
import fpl.sd.backend.dto.response.SizeChartResponse;
import fpl.sd.backend.dto.response.VariantResponse;
import fpl.sd.backend.entity.ShoeVariant;
import fpl.sd.backend.entity.SizeChart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShoeVariantMapper {
    VariantResponse toShoeVariantResponse(ShoeVariant shoeVariant);


    ShoeVariant toShoeVariant(VariantRequest request);



}
