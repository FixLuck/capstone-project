package fpl.sd.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import fpl.sd.backend.ai.chat.dto.ContentMessageRequest;
import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.service.DiscountService;
import fpl.sd.backend.service.ShoeService;
import lombok.AccessLevel;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/chat")
public class ChatController {
    ShoeService shoeService;
    DiscountService discountService;

    @PostMapping("/shoe-data")
    public ApiResponse<String> promptShoe(@RequestBody ContentMessageRequest messageRequest) throws JsonProcessingException {
        return ApiResponse.<String>builder()
                .flag(true)
                .message("OK")
                .result(shoeService.shoeData(messageRequest.getContent()))
                .build();

    }

    @PostMapping("/discount-data")
    public ApiResponse<String> promptDiscount(@RequestBody ContentMessageRequest messageRequest) throws JsonProcessingException {
        return ApiResponse.<String>builder()
                .flag(true)
                .message("OK")
                .result(discountService.discountData(messageRequest.getContent()))
                .build();
    }

}
