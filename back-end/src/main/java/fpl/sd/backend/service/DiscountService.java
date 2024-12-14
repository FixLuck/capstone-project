package fpl.sd.backend.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fpl.sd.backend.ai.chat.ChatClient;
import fpl.sd.backend.ai.chat.dto.ChatRequest;
import fpl.sd.backend.ai.chat.dto.ChatResponse;
import fpl.sd.backend.ai.chat.dto.Message;
import fpl.sd.backend.constant.DiscountConstants;

import fpl.sd.backend.dto.PageResponse;
import fpl.sd.backend.dto.request.DiscountCreateRequest;
import fpl.sd.backend.dto.request.DiscountUpdateRequest;
import fpl.sd.backend.dto.response.DiscountResponse;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.entity.CustomerOrder;
import fpl.sd.backend.entity.Discount;
import fpl.sd.backend.entity.Shoe;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.DiscountMapper;
import fpl.sd.backend.repository.DiscountRepository;
import fpl.sd.backend.utils.MessageUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
public class DiscountService {
    DiscountRepository discountRepository;
    DiscountMapper discountMapper;
    ObjectMapper objectMapper;
    ChatClient chatClient;

    public List<DiscountResponse> getAllDiscounts() {
        List<Discount> discounts = discountRepository.findAll();
        return discounts.stream()
                .map(discountMapper::toDiscountResponse)
                .toList();
    }


//    public DiscountResponse createDiscount(DiscountCreateRequest request) {
//        Discount discounts = discountMapper.toDiscount(request);
//        if(discountRepository.existsByCode(request.getCode())){
//            throw new AppException(ErrorCode.DISCOUNT_ALREADY_EXISTS);
//        }

//        discountRepository.save(discounts);
//        return discountMapper.toDiscountResponse(discounts);
//    }

    public DiscountResponse createDiscount(DiscountCreateRequest request) {
        // Kiểm tra ngày hợp lệ
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new AppException(ErrorCode.INVALID_DATE_RANGE);
        }

        // Kiểm tra code trùng lặp
        if (discountRepository.existsByCode(request.getCode())) {
            throw new AppException(ErrorCode.DISCOUNT_ALREADY_EXISTS);
        }

        // Ánh xạ từ request sang entity
        Discount discounts = discountMapper.toDiscount(request);

        // Áp dụng logic kiểm tra và điều chỉnh các trường discount
        discounts.setDiscountValues();

        // Lưu dữ liệu vào database
        discountRepository.save(discounts);

        // Trả về response
        return discountMapper.toDiscountResponse(discounts);
    }


    public DiscountResponse getDiscountById(Integer id) {
        return discountMapper.toDiscountResponse(discountRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.DISCOUNT_NOT_FOUND)));
    }

    public List<DiscountResponse> getDiscountByDiscountType(String discountType) {
        DiscountConstants.DiscountType discountTypeEnum = DiscountConstants.getDiscountTypeFromString(discountType);
        if (discountTypeEnum == null) {
            throw new IllegalArgumentException("Invalid discount type provided");
        }
        List<Discount> discounts = discountRepository.findByDiscountType(discountTypeEnum);
        return discounts.stream()
                .map(discountMapper::toDiscountResponse)
                .toList();
    }

    public List<DiscountResponse> getDiscountByIsActive(boolean isActive) {
        List<Discount> discounts = discountRepository.findByIsActive(isActive);
        return discounts.stream()
                .map(discountMapper::toDiscountResponse)
                .toList();
    }

    public List<DiscountResponse> getDiscountsByCode(String code) {
        List<Discount> discounts = discountRepository.findDiscountsByCodeContainingIgnoreCase(code);
        return discounts.stream()
                .map(discountMapper::toDiscountResponse)
                .toList();
    }

    public DiscountResponse updateDiscount(Integer id, DiscountUpdateRequest request) {
        Discount discount = discountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DISCOUNT_NOT_FOUND));

        if (request.getCode() != null) {
            discount.setCode(request.getCode());
        }
        if (request.getPercentage() != null) {
            discount.setPercentage(request.getPercentage());
        }
        if (request.getDescription() != null) {
            discount.setDescription(request.getDescription());
        }
//        if (request.getStartDate() != null) {
//            discount.setStartDate(request.getStartDate());
//        }
        if (request.getMinimumOrderAmount() != null) {
            discount.setMinimumOrderAmount(request.getMinimumOrderAmount());
        }
//        if (request.getEndDate() != null) {
//            discount.setEndDate(request.getEndDate());
//        }
        // Kiểm tra ngày hợp lệ
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new AppException(ErrorCode.INVALID_DATE_RANGE);
        }
        if (request.getDiscountType() != null) {
            discount.setDiscountType(request.getDiscountType());
        }
        if (request.getFixedAmount() != null) {
            discount.setFixedAmount(request.getFixedAmount());
        }
        if (request.getActive() != null) {
            discount.setActive(request.getActive());
        }

        discountRepository.save(discount);

        return discountMapper.toDiscountResponse(discount);
    }



//    public double applyDiscount(String code, double orderTotal) {
//        // Fetch discount details by code
//        Discount discount = discountRepository.findByCode(code)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid discount code"));
//
//        // Validate discount (check expiry, usage limits, etc.)
//        if (!discount.isValid()) {
//            throw new IllegalArgumentException("Discount code is not valid");
//        }
//
//        // Apply discount amount or percentage
//        double discountAmount = discount.getAmount();
//        double newTotal = orderTotal;
//
//        if (discount.isPercentage()) {
//            newTotal -= orderTotal * (discountAmount / 100);
//        } else {
//            newTotal -= discountAmount;
//        }
//
//        return Math.max(newTotal, 0); // Ensure total is not negative
//    }

//    public PageResponse<DiscountResponse> getDiscountPaging(
//            String discountTypeString,
//            String code,
//            boolean isActive,
//            int page,
//            int size,
//            String sortOrder
//    ) {
//
//        Sort sort = createSort(sortOrder);
//
//
//        Pageable pageable = PageRequest.of(page - 1, size, sort);
//
//        DiscountConstants.DiscountType discountTypeEnum = DiscountConstants.getDiscountTypeFromString(discountTypeString);
//
//
//        Page<Discount> discountData = discountRepository.findDiscountByFilters(discountTypeEnum, code, isActive, pageable);
//
//        var  discountList= discountData.getContent()
//                .stream()
//                .map(discountMapper::toDiscountResponse)
//                .toList();
//
//        return PageResponse.<DiscountResponse>builder()
//                .currentPage(page)
//                .pageSize(discountData.getSize())
//                .totalPages(discountData.getTotalPages())
//                .totalElements(discountData.getTotalElements())
//                .data(discountList)
//                .build();
//
//
//    }
public PageResponse<DiscountResponse> getDiscountPaging(
        String discountTypeString,
        String code,
        Boolean isActive, // Đảm bảo là Boolean, không phải boolean
        int page,
        int size,
        String sortOrder
) {

    Sort sort = createSort(sortOrder);
    Pageable pageable = PageRequest.of(page - 1, size, sort);

    DiscountConstants.DiscountType discountTypeEnum = DiscountConstants.getDiscountTypeFromString(discountTypeString);

    // Gọi phương thức findDiscountByFilters với tham số isActive là null nếu không có giá trị
    Page<Discount> discountData;
    if (isActive == null) {
        discountData = discountRepository.findDiscountByFilters(discountTypeEnum, code, null, pageable); // Truyền null nếu isActive không được cung cấp
    } else {
        discountData = discountRepository.findDiscountByFilters(discountTypeEnum, code, isActive, pageable); // Truyền giá trị isActive nếu có
    }

    var discountList = discountData.getContent()
            .stream()
            .map(discountMapper::toDiscountResponse)
            .toList();

    return PageResponse.<DiscountResponse>builder()
            .currentPage(page)
            .pageSize(discountData.getSize())
            .totalPages(discountData.getTotalPages())
            .totalElements(discountData.getTotalElements())
            .data(discountList)
            .build();
}



    private Sort createSort(String sortOrder) {

        String date = "endDate";
        if (sortOrder == null) {
            return Sort.by(Sort.Direction.ASC, date);
        }

        return switch (sortOrder.toLowerCase()) {
            case "pcdesc" -> Sort.by(Sort.Direction.DESC, "percentage");
            case "pcasc" -> Sort.by(Sort.Direction.ASC, "percentage");
            case "fadesc" -> Sort.by(Sort.Direction.DESC, "fixedAmount");
            case "faasc" -> Sort.by(Sort.Direction.ASC, "fixedAmount");
            case "date_desc" -> Sort.by(Sort.Direction.DESC, date);
            default -> Sort.by(Sort.Direction.ASC, date);
        };
    }

    public String discountData(String messageContent) throws JsonProcessingException {
        String jsonArray = objectMapper.writeValueAsString(this.getAllDiscounts());
        List<Message> messages = MessageUtil.createMessages("You are a helpful assistant " + messageContent, jsonArray);

        ChatRequest chatRequest = new ChatRequest("gpt-4o-mini", messages);
        ChatResponse chatResponse = this.chatClient.generate(chatRequest);

        return chatResponse.getChoices().getFirst().getMessage().getContent();
    }

}


