package fpl.sd.backend.controller;

import fpl.sd.backend.constant.DiscountConstants;
import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.PageResponse;
import fpl.sd.backend.dto.request.DiscountCreateRequest;
import fpl.sd.backend.dto.request.DiscountUpdateRequest;
import fpl.sd.backend.dto.response.DiscountResponse;
import fpl.sd.backend.dto.response.EnumResponse;
import fpl.sd.backend.dto.response.OrderDetailResponse;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.service.DiscountService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/discounts")
@RequiredArgsConstructor

//@CrossOrigin(origins = "http://localhost:5173")

@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
public class DiscountController {
    DiscountService discountService;


    @PostMapping
    public ApiResponse<DiscountResponse> addDiscount(@RequestBody @Valid DiscountCreateRequest discount) {
        return ApiResponse.<DiscountResponse>builder()
                .flag(true)
                .code(200)
                .message("Successfully added discount")
                .result(discountService.createDiscount(discount))
                .build();
    }

    @GetMapping
    public ApiResponse<List<DiscountResponse>> GetAllDiscounts() {
        return ApiResponse.<List<DiscountResponse>>builder()
                .flag(true)
                .code(200)
                .message("Successfully loaded")
                .result(discountService.getAllDiscounts())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<DiscountResponse> GetDiscountByID(@PathVariable Integer id) {
        return ApiResponse.<DiscountResponse>builder()
                .flag(true)
                .code(200)
                .message("Successfully")
                .result(discountService.getDiscountById(id))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<DiscountResponse> updateDiscount(@PathVariable Integer id, @RequestBody @Valid DiscountUpdateRequest request) {
        DiscountResponse discountResponse = discountService.updateDiscount(id, request);
        return ApiResponse.<DiscountResponse>builder()
                .flag(true)
                .code(200)
                .message("Discount updated successfully")
                .result(discountResponse)
                .build();
    }

    @GetMapping("/isActive")
    public ApiResponse<List<DiscountResponse>> getDiscountByIsActive(@RequestParam(value = "isActive", required = false) boolean isActive) {
        return ApiResponse.<List<DiscountResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(discountService.getDiscountByIsActive(isActive))
                .build();
    }

    @GetMapping("/discountType")
    public ApiResponse<List<EnumResponse>> getDiscountByDiscountType() {
        return ApiResponse.<List<EnumResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(DiscountConstants.getAllDiscountTypeResponses())
                .build();
    }

    @GetMapping("/list-discount")
    public ApiResponse<PageResponse<DiscountResponse>> getDiscountPaging(
            @RequestParam(required = false) String discountType,
            @RequestParam(required = false) String code,
//            @RequestParam(required = false) boolean isActive,
            @RequestParam(required = false) Boolean isActive,  // Thay đổi từ boolean sang Boolean
            @RequestParam(defaultValue = "date") String sortOrder,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        return ApiResponse.<PageResponse<DiscountResponse>>builder()
                .flag(true)
                .message("OK")
                .result(discountService.getDiscountPaging( discountType, code, isActive, page, size, sortOrder))
                .build();
    }
}
