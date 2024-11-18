package fpl.sd.backend.controller;

import fpl.sd.backend.constant.ShoeConstants;
import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.PageResponse;
import fpl.sd.backend.dto.request.ShoeCreateRequest;
import fpl.sd.backend.dto.request.ShoeUpdateRequest;
import fpl.sd.backend.dto.response.EnumResponse;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.service.ShoeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shoes")
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ShoeController {
    ShoeService shoeService;

    @GetMapping
    public ApiResponse<List<ShoeResponse>> getAllShoes() {
        return ApiResponse.<List<ShoeResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeService.getAllShoes())
                .build();
    }

    @GetMapping("/by-gender")
    public ApiResponse<List<ShoeResponse>> getShoesByGender(@RequestParam(value = "gender", required = false) String gender) {
        List<ShoeResponse> shoes = shoeService.getShoesByGender(gender);
        return ApiResponse.<List<ShoeResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoes)
                .build();
    }

    @GetMapping("/by-brand")
    public ApiResponse<List<ShoeResponse>> getShoesByBrand(@RequestParam(value = "brand", required = false) Integer brand) {
        return ApiResponse.<List<ShoeResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeService.getShoesByBrand(brand))
                .build();
    }

    @GetMapping("/by-category")
    public ApiResponse<List<ShoeResponse>> getShoesByCategory(@RequestParam(value = "category", required = false) String category) {
        return ApiResponse.<List<ShoeResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeService.getShoesByCategory(category))
                .build();
    }

    @PostMapping
    public ApiResponse<ShoeResponse> createShoe(@RequestBody ShoeCreateRequest request) {
        return ApiResponse.<ShoeResponse>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeService.createShoe(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ShoeResponse> getShoeById(@PathVariable("id") int id) {
        return ApiResponse.<ShoeResponse>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeService.getShoeById(id))
                .build();

    }

    @PutMapping("/{id}")
    public ApiResponse<ShoeResponse> updateShoe(@PathVariable("id") int id, @RequestBody ShoeUpdateRequest request) {
        return ApiResponse.<ShoeResponse>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeService.updateShoe(request, id))
                .build();
    }

    @GetMapping("/shop")
    public ApiResponse<List<ShoeResponse>> getShoesByName(@RequestParam(value = "name", required = false) String name) {
        return ApiResponse.<List<ShoeResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeService.getShoesByName(name))
                .build();
    }

    @GetMapping("/categories")
    public ApiResponse<List<EnumResponse>> getShoeCategories() {
        return ApiResponse.<List<EnumResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(ShoeConstants.getAllCategoryResponses())
                .build();
    }

    @GetMapping("/genders")
    public ApiResponse<List<EnumResponse>> getShoeGenders() {
        return ApiResponse.<List<EnumResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(ShoeConstants.getAllGenderResponses())
                .build();
    }

    @GetMapping("/list-shoes")
    public ApiResponse<PageResponse<ShoeResponse>> getShoePaging(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) Integer brandId,  // Changed default to 0
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "date") String sortOrder,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size
            ) {
        return ApiResponse.<PageResponse<ShoeResponse>>builder()
                .flag(true)
                .message("OK")
                .result(shoeService.getShoePaging(name, minPrice, maxPrice, brandId, gender, category, page, size, sortOrder))
                .build();
    }


}
