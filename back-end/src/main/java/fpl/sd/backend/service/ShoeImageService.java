package fpl.sd.backend.service;

import fpl.sd.backend.dto.response.ImageResponse;
import fpl.sd.backend.entity.ShoeImage;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.ShoeImageMapper;
import fpl.sd.backend.repository.ShoeImageRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShoeImageService {
    ShoeImageRepository shoeImageRepository;
    private final ShoeImageMapper shoeImageMapper;

    public List<ImageResponse> getShoeImagesByShoeId(int shoeId) {
        if (!shoeImageRepository.existsByShoeId(shoeId)) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ShoeImage> images = shoeImageRepository.findAllByShoeId(shoeId);
        return images.stream()
                .map(shoeImageMapper::toImageResponse)
                .toList();

    }

    
}
