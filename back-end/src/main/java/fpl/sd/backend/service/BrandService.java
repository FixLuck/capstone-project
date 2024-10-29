package fpl.sd.backend.service;

import fpl.sd.backend.dto.request.BrandCreateRequest;
import fpl.sd.backend.dto.response.BrandResponse;
import fpl.sd.backend.entity.Brand;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.BrandMapper;
import fpl.sd.backend.repository.BrandRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class BrandService {
    BrandRepository brandRepository;
    BrandMapper brandMapper;

    public BrandResponse createBrand(BrandCreateRequest request) {
        Brand newBrand = brandMapper.toBrand(request);
        if (brandRepository.existsByBrandName(request.getBrandName())) {
            throw new AppException(ErrorCode.BRAND_ALREADY_EXISTS);
        }
        newBrand.setCreatedAt(Instant.now());
        brandRepository.save(newBrand);
        return brandMapper.toBrandResponse(newBrand);
    }

    public List<BrandResponse> getBrands() {
        List<Brand> brands = brandRepository.findAll();
        return brands.stream()
                .map(brandMapper::toBrandResponse)
                .toList();
    }


    public BrandResponse getBrandById(int id) {
        return brandMapper.toBrandResponse(brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find brand")));

    }
}
