package fpl.sd.backend.controller;

import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.request.ShoeCreateRequest;
import fpl.sd.backend.dto.response.ImageResponse;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.dto.response.VariantResponse;
import fpl.sd.backend.service.ShoeImageService;
import fpl.sd.backend.service.ShoeService;
import fpl.sd.backend.service.ShoeVariantService;
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
    ShoeVariantService shoeVariantService;
    ShoeImageService shoeImageService;

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

    @GetMapping("/{shoeId}/variants")
    public ApiResponse<List<VariantResponse>> getVariantsByShoeId(@PathVariable int shoeId) {
        return ApiResponse.<List<VariantResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeVariantService.getVariantsByShoeId(shoeId))
                .build();
    }

    @GetMapping("/{shoeId}/images")
    public ApiResponse<List<ImageResponse>> getShoeImagesByShoeId(@PathVariable int shoeId) {
        return ApiResponse.<List<ImageResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(shoeImageService.getShoeImagesByShoeId(shoeId))
                .build();

    }
}
