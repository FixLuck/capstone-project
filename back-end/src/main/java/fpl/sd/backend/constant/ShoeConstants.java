package fpl.sd.backend.constant;

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
}
