package fpl.sd.backend.controller;

import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.response.SizeResponse;
import fpl.sd.backend.dto.response.VariantResponse;
import fpl.sd.backend.service.ShoeVariantService;
import fpl.sd.backend.service.SizeService;
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
public class ShoeVariantController {

    SizeService sizeService;

    @GetMapping("/sizes")
    public ApiResponse<List<SizeResponse>> sizes() {
        return ApiResponse.<List<SizeResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(sizeService.getAllSizes())
                .build();
    }

}
