package fpl.sd.backend.service;

import fpl.sd.backend.constant.ShoeConstants;
import fpl.sd.backend.dto.request.ShoeCreateRequest;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.entity.*;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.ShoeImageMapper;
import fpl.sd.backend.mapper.ShoeMapper;
import fpl.sd.backend.mapper.ShoeVariantMapper;
import fpl.sd.backend.repository.*;
import fpl.sd.backend.utils.SKUGenerators;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;


@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ShoeService {
    ShoeRepository shoeRepository;
    ShoeMapper shoeMapper;
    BrandRepository brandRepository;
    ShoeImageRepository shoeImageRepository;
    SKUGenerators skuGenerators;
    SizeChartRepository sizeChartRepository;
    ShoeVariantRepository shoeVariantRepository;
    ShoeImageMapper imageMapper;
    ShoeVariantMapper shoeVariantMapper;

    public List<ShoeResponse> getAllShoes() {
        List<Shoe> shoes = shoeRepository.findAll();
        return shoes.stream()
                .map(shoe -> {
                    ShoeResponse response = shoeMapper.toShoeResponse(shoe);
                    List<ShoeImage> images = shoeImageRepository.findAllByShoeId(shoe.getId());
                    response.setImages(images.stream()
                            .map(imageMapper::toImageResponse)
                            .toList());
                    return response;
                })
                .toList();
    }

    public ShoeResponse getShoeById(int id) {
        Shoe shoe = shoeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return shoeMapper.toShoeResponse(shoe);
    }

    public List<ShoeResponse> getShoesByGender(String gender) {
        ShoeConstants.Gender genderEnum = ShoeConstants.getGenderFromString(gender);
        if (genderEnum == null) {
            throw new IllegalArgumentException("Invalid gender provided");
        }
        List<Shoe> shoes = shoeRepository.findShoesByGender(genderEnum);
        return shoes.stream()
                .map(shoeMapper::toShoeResponse)
                .toList();
    }

    public List<ShoeResponse> getShoesByBrand(Integer brandId) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        List<Shoe> shoes = shoeRepository.findShoesByBrand(brand);
        return shoes.stream()
                .map(shoeMapper::toShoeResponse)
                .toList();
    }

    public List<ShoeResponse> getShoesByCategory(String categoryName) {
        ShoeConstants.Category categoryEnum = ShoeConstants.getCategoryFromString(categoryName);
        if (categoryEnum == null) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<Shoe> shoes = shoeRepository.findShoesByCategory(categoryEnum);

        return shoes.stream()
                .map(shoeMapper::toShoeResponse)
                .toList();
    }

    public ShoeResponse createShoe(ShoeCreateRequest request) {
        Shoe newShoe = shoeMapper.toShoe(request);
        newShoe.setCreatedAt(Instant.now());

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        newShoe.setBrand(brand);

        shoeRepository.save(newShoe);

        List<ShoeImage> images = request.getImages().stream()
                        .map(imgRequest -> {
                            ShoeImage shoeImage = imageMapper.toShoeImage(imgRequest);
                            shoeImage.setShoe(newShoe);
                            shoeImage.setCreatedAt(Instant.now());
                            return shoeImage;
                        }).toList();

        shoeImageRepository.saveAll(images);

        List<ShoeVariant> variants = request.getVariants().stream()
                .map(variant -> {
                    ShoeVariant shoeVariant = shoeVariantMapper.toShoeVariant(variant);

                    int sizeId = variant.getSizeId();
                    SizeChart size = sizeChartRepository.findById(sizeId)
                            .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));
                    shoeVariant.setCreatedAt(Instant.now());
                    shoeVariant.setSizeChart(size);
                    String sku = skuGenerators.generateSKU(brand.getBrandName(), request.getName(), size.getSizeNumber());

                    if (shoeVariantRepository.existsBySku(sku)) {
                        throw new AppException(ErrorCode.SKU_ALREADY_EXISTS);
                    }
                    shoeVariant.setShoe(newShoe);
                    shoeVariant.setSku(sku);
                    return shoeVariant;
                })
                .toList();

        shoeVariantRepository.saveAll(variants);
        return shoeMapper.toShoeResponse(newShoe);

    }



}
