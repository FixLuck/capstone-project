package fpl.sd.backend.constant;

import fpl.sd.backend.dto.response.EnumResponse;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ShoeConstants {

    public enum Gender {
        MAN, WOMEN, UNISEX
    }

    public enum Category {
        RUNNING, CASUAL, SPORT
    }

    public static Gender getGenderFromString(String genderString) {
        for (Gender gender : Gender.values()) {
            if (gender.name().equalsIgnoreCase(genderString)) {
                return gender;
            }
        }
        return null;
    }

    public static Category getCategoryFromString(String categoryString) {
        for (Category category : Category.values()) {
            if (category.name().equalsIgnoreCase(categoryString)) {
                return category;
            }
        }
        return null;
    }


    public static List<EnumResponse> getAllGenderResponses() {
        return Arrays.stream(Gender.values())
                .map(gender -> new EnumResponse(gender.name(), gender.name().toLowerCase()))
                .toList();
    }

    public static List<EnumResponse> getAllCategoryResponses() {
        return Arrays.stream(Category.values())
                .map(category -> new EnumResponse(category.name(), category.name().toLowerCase()))
                .toList();
    }
}
