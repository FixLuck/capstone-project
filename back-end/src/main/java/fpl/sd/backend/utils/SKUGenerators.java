package fpl.sd.backend.utils;

import org.springframework.stereotype.Service;

@Service
public class SKUGenerators {
    public String generateSKU(String brand, String name, Double size) {
        String brandCode = brand.substring(0, 3).toUpperCase();
        String[] words = name.split(" ");
        String nameCode;
        if (words.length >= 2) {
            nameCode = (words[0].substring(0,2) + words[1].substring(0,2) + words[2].charAt(0)).toUpperCase();
        } else {
            nameCode = name.substring(0, Math.min(20, name.length())).toUpperCase();
        }

        String sizeCode = size % 1 == 0 ? String.format("%d", size.intValue()) : String.format("%.1f", size);

        return String.format("%s-%s-%s", brandCode, nameCode, sizeCode);
    }

}
