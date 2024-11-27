package fpl.sd.backend.constant;

import fpl.sd.backend.dto.response.EnumResponse;

import java.util.Arrays;
import java.util.List;

public class DiscountConstants {
    public enum DiscountType {
        FIXED_AMOUNT, PERCENTAGE
    }
    public static DiscountConstants.DiscountType getDiscountTypeFromString(String discountTypeString) {
        for (DiscountConstants.DiscountType discountType : DiscountConstants.DiscountType.values()) {
            if (discountType.name().equalsIgnoreCase(discountTypeString)) {
                return discountType;
            }
        }
        return null;
    }
    public static List<EnumResponse> getAllDiscountTypeResponses() {
        return Arrays.stream(DiscountConstants.DiscountType.values())
                .map(discountType -> new EnumResponse(discountType.name(), discountType.name().toLowerCase()))
                .toList();
    }
}
