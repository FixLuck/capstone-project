package fpl.sd.backend.service;

import fpl.sd.backend.constant.ShoeConstants;
import fpl.sd.backend.dto.PageResponse;
import fpl.sd.backend.dto.request.ShoeCreateRequest;
import fpl.sd.backend.dto.request.ShoeUpdateRequest;
import fpl.sd.backend.dto.request.VariantUpdateRequest;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.dto.response.VariantResponse;
import fpl.sd.backend.entity.*;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.ShoeImageMapper;
import fpl.sd.backend.mapper.ShoeMapper;
import fpl.sd.backend.mapper.ShoeVariantMapper;
import fpl.sd.backend.repository.*;
import fpl.sd.backend.utils.SKUGenerators;
import fpl.sd.backend.utils.ShoeHelper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;


import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ShoeService {
    private static final Logger log = LoggerFactory.getLogger(ShoeService.class);
    ShoeRepository shoeRepository;
    ShoeMapper shoeMapper;
    BrandRepository brandRepository;
    ShoeImageRepository shoeImageRepository;
    SKUGenerators skuGenerators;
    SizeChartRepository sizeChartRepository;
    ShoeVariantRepository shoeVariantRepository;
    ShoeImageMapper imageMapper;
    ShoeVariantMapper shoeVariantMapper;
    ShoeHelper shoeHelper;

    public List<ShoeResponse> getAllShoes() {
        List<Shoe> shoes = shoeRepository.findAll();
        return shoes.stream()
                .map(shoeHelper::getShoeResponse)
                .toList();
    }

    public ShoeResponse getShoeById(int id) {
        Shoe shoe = shoeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return shoeHelper.getShoeResponse(shoe);
    }

    public List<ShoeResponse> getShoesByGender(String gender) {
        ShoeConstants.Gender genderEnum = ShoeConstants.getGenderFromString(gender);
        if (genderEnum == null) {
            throw new IllegalArgumentException("Invalid gender provided");
        }
        List<Shoe> shoes = shoeRepository.findShoesByGender(genderEnum);
        return shoes.stream()
                .map(shoeHelper::getShoeResponse)
                .toList();
    }

    public List<ShoeResponse> getShoesByBrand(Integer brandId) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        List<Shoe> shoes = shoeRepository.findShoesByBrand(brand);
        return shoes.stream()
                .map(shoeHelper::getShoeResponse)
                .toList();
    }

    public List<ShoeResponse> getShoesByCategory(String categoryName) {
        ShoeConstants.Category categoryEnum = ShoeConstants.getCategoryFromString(categoryName);
        if (categoryEnum == null) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<Shoe> shoes = shoeRepository.findShoesByCategory(categoryEnum);

        return shoes.stream()
                .map(shoeHelper::getShoeResponse)
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
                    String sku = skuGenerators.generateSKU(brand.getBrandName(),
                            request.getName(),
                            size.getSizeNumber());

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

    public List<ShoeResponse> getShoesByName(String name) {
        List<Shoe> shoes = shoeRepository.findShoesByNameContainingIgnoreCase(name);
        return shoes.stream()
                .map(shoeHelper::getShoeResponse)
                .toList();
    }

    public ShoeResponse updateShoe(ShoeUpdateRequest request, int shoeId) {
        Shoe selectedShoe = shoeRepository.findById(shoeId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        selectedShoe.setUpdatedAt(Instant.now());
        selectedShoe.setName(request.getName());
        selectedShoe.setPrice(request.getPrice());
        selectedShoe.setDescription(request.getDescription());
        selectedShoe.setFakePrice(request.getFakePrice());
        selectedShoe.setGender(ShoeConstants.getGenderFromString(request.getGender()));
        selectedShoe.setCategory(ShoeConstants.getCategoryFromString(request.getCategory()));
        selectedShoe.setStatus(request.isStatus());

        List<ShoeVariant> updatedVariants = new ArrayList<>();
        for (VariantUpdateRequest variantRequest : request.getVariants()) {
            ShoeVariant existingVariant = selectedShoe.getShoeVariants().stream()
                    .filter(v -> v.getId().equals(variantRequest.getVariantId()))
                    .findFirst()
                    .orElseThrow(() -> new AppException(ErrorCode.INVALID_KEY));

            existingVariant.setUpdatedAt(Instant.now());
            existingVariant.setStockQuantity(variantRequest.getStockQuantity());
            updatedVariants.add(existingVariant);
        }

        selectedShoe.setShoeVariants(updatedVariants);
        this.shoeRepository.save(selectedShoe);
        return shoeHelper.getShoeResponse(selectedShoe);
    }

    public PageResponse<ShoeResponse> getShoePaging(String name,
                                                    Long minPrice,
                                                    Long maxPrice,
                                                    Integer brandId,
                                                    String genderString,
                                                    String categoryString,
                                                    int page,
                                                    int size,
                                                    String sortOrder,
                                                    Boolean status
                                                    ) {

        Sort sort = createSort(sortOrder);


        Pageable pageable = PageRequest.of(page - 1, size, sort);

        ShoeConstants.Gender genderEnum = ShoeConstants.getGenderFromString(genderString);
        ShoeConstants.Category categoryEnum = ShoeConstants.getCategoryFromString(categoryString);

        Page<Shoe> shoeData = shoeRepository.findShoesByFilters(name, minPrice, maxPrice, brandId, genderEnum, categoryEnum, status, pageable);

        var shoeList = shoeData.getContent()
                .stream()
                .map(shoeHelper::getShoeResponse)
                .toList();

        return PageResponse.<ShoeResponse>builder()
                .currentPage(page)
                .pageSize(shoeData.getSize())
                .totalPages(shoeData.getTotalPages())
                .totalElements(shoeData.getTotalElements())
                .data(shoeList)
                .build();


    }

    private Sort createSort(String sortOrder) {

        String date = "createdAt";
        if (sortOrder == null) {
            return Sort.by(Sort.Direction.ASC, date);
        }

        return switch (sortOrder.toLowerCase()) {
            case "desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "date_desc" -> Sort.by(Sort.Direction.DESC, date);
            default -> Sort.by(Sort.Direction.ASC, date);
        };
    }



}
