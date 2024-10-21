package fpl.sd.backend.utils;

import org.springframework.stereotype.Service;

@Service
public class SKUGenerators {
    public String generateSKU(String brand, String name, Double size) {
        String brandCode = brand.substring(0, 3).toUpperCase();
        String nameCode = name.substring(0, 2).toUpperCase();
        String sizeCode = size % 1 == 0 ? String.format("%d", size.intValue()) : String.format("%.1f", size);

        return String.format("%s-%s-%s", brandCode, nameCode, sizeCode);
    }

}
