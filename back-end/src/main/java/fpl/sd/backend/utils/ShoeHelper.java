package fpl.sd.backend.utils;

import fpl.sd.backend.dto.response.ImageResponse;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.entity.Shoe;
import fpl.sd.backend.entity.ShoeImage;
import fpl.sd.backend.entity.ShoeVariant;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.ShoeImageMapper;
import fpl.sd.backend.mapper.ShoeMapper;
import fpl.sd.backend.mapper.ShoeVariantMapper;
import fpl.sd.backend.repository.ShoeImageRepository;
import fpl.sd.backend.repository.ShoeVariantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShoeHelper {
    ShoeImageRepository shoeImageRepository;
    ShoeVariantRepository shoeVariantRepository;
    ShoeImageMapper shoeImageMapper;
    ShoeVariantMapper shoeVariantMapper;
    ShoeMapper shoeMapper;

    public ShoeResponse getShoeResponse(Shoe shoe) {
        if (shoe == null) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        ShoeResponse response = shoeMapper.toShoeResponse(shoe);

        if (shoeVariantRepository != null) {
            List<ShoeImage> images = shoeImageRepository.findAllByShoeId(shoe.getId());
            response.setImages(images.stream()
                    .map(shoeImageMapper::toImageResponse)
                    .toList());

        }

        if (shoeVariantRepository != null) {
            List<ShoeVariant> variants = shoeVariantRepository.findShoeVariantByShoeId(shoe.getId());
            response.setVariants(variants.stream()
                    .map(shoeVariantMapper::toShoeVariantResponse)
                    .toList());
        }

        return response;
    }
}
