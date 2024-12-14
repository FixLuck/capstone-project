package fpl.sd.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fpl.sd.backend.ai.chat.ChatClient;
import fpl.sd.backend.ai.chat.dto.ChatRequest;
import fpl.sd.backend.ai.chat.dto.ChatResponse;
import fpl.sd.backend.ai.chat.dto.Message;
import fpl.sd.backend.dto.request.BrandCreateRequest;
import fpl.sd.backend.dto.response.BrandResponse;
import fpl.sd.backend.entity.Brand;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.BrandMapper;
import fpl.sd.backend.repository.BrandRepository;
import fpl.sd.backend.utils.MessageUtil;
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
    ChatClient chatClient;

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

    public String summarize(List<BrandResponse> brandResponses, String messageContent) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonArray = objectMapper.writeValueAsString(brandResponses);

        //Prepare the messages for summarizing
//        List<Message> messages = List.of(
//                new Message("system", messageContent),
//                new Message("user", jsonArray)
//        );

        List<Message> messages = MessageUtil.createMessages(messageContent, jsonArray);

        ChatRequest chatRequest = new ChatRequest("gpt-4o-mini", messages);
        ChatResponse chatResponse = this.chatClient.generate(chatRequest); // Tell chat client to generate
                                                                            // summary base on the text request

        return chatResponse.getChoices().getFirst().getMessage().getContent();
    }
}
