package fpl.sd.backend.service;

import fpl.sd.backend.dto.response.VariantResponse;
import fpl.sd.backend.entity.ShoeVariant;
import fpl.sd.backend.entity.SizeChart;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.ShoeVariantMapper;
import fpl.sd.backend.mapper.SizeChartMapper;
import fpl.sd.backend.repository.ShoeVariantRepository;
import fpl.sd.backend.repository.SizeChartRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ShoeVariantService {
    ShoeVariantRepository shoeVariantRepository;
    ShoeVariantMapper shoeVariantMapper;
    SizeChartRepository sizeChartRepository;
    SizeChartMapper sizeChartMapper;

    public List<VariantResponse> getAllVariants() {
        List<ShoeVariant> shoeVariants = shoeVariantRepository.findAll();
        return shoeVariants.stream()
                .map(shoeVariantMapper::toShoeVariantResponse)
                .toList();
    }

    public VariantResponse getVariantById(String id) {
        ShoeVariant shoeVariant = shoeVariantRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        return shoeVariantMapper.toShoeVariantResponse(shoeVariant);
    }

    public List<VariantResponse> getVariantsByShoeId(Integer shoeId) {
        List<ShoeVariant> shoeVariants = shoeVariantRepository.findShoeVariantByShoeId(shoeId);
        if (shoeId == null) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        return shoeVariants.stream()
                .map(variant -> {
                    VariantResponse response = shoeVariantMapper.toShoeVariantResponse(variant);
                    List<SizeChart> sizes = sizeChartRepository.findAllById(variant.getSizeChart().getId());
                    response.setSizes(sizes.stream()
                            .map(sizeChartMapper::toSizeChartResponse)
                            .toList());
                    return response;
                }).toList();
    }


}
