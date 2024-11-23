package fpl.sd.backend.service;


import fpl.sd.backend.dto.request.DiscountCreateRequest;
import fpl.sd.backend.dto.request.DiscountUpdateRequest;
import fpl.sd.backend.dto.response.DiscountResponse;
import fpl.sd.backend.entity.Discount;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.DiscountMapper;
import fpl.sd.backend.repository.DiscountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
public class DiscountService {
    DiscountRepository discountRepository;
    DiscountMapper discountMapper;

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
        if (request.getStartDate() != null) {
            discount.setStartDate(request.getStartDate());
        }
        if (request.getMinimumOrderAmount() != null) {
            discount.setMinimumOrderAmount(request.getMinimumOrderAmount());
        }
        if (request.getEndDate() != null) {
            discount.setEndDate(request.getEndDate());
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

}
