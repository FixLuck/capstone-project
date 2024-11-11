package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.VariantRequest;

import fpl.sd.backend.dto.response.VariantResponse;
import fpl.sd.backend.entity.ShoeVariant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;



@Mapper(componentModel = "spring")
public interface ShoeVariantMapper {
    VariantResponse toShoeVariantResponse(ShoeVariant shoeVariant);

    @Mapping(source = "variantId", target = "id")
    ShoeVariant toShoeVariant(VariantRequest request);



}
