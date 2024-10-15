package fpl.sd.backend.controller;

import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.request.BrandCreateRequest;
import fpl.sd.backend.dto.request.BrandResponse;
import fpl.sd.backend.service.BrandService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class BrandController {
    BrandService brandService;

    @PostMapping
    public ApiResponse<BrandResponse> createBrand(@RequestBody @Valid BrandCreateRequest request) {
        return ApiResponse.<BrandResponse>builder()
                .flag(true)
                .code(200)
                .message("Successfully created brand")
                .result(brandService.createBrand(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<BrandResponse>> getAllBrands() {
        return ApiResponse.<List<BrandResponse>>builder()
                .flag(true)
                .code(200)
                .message("Successfully retrieved all brands")
                .result(brandService.getBrands())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BrandResponse> getBrandById(@PathVariable int id) {
        return ApiResponse.<BrandResponse>builder()
                .flag(true)
                .code(200)
                .message("Successfully retrieved brand")
                .result(brandService.getBrandById(id))
                .build();
    }
}
