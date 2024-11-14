package fpl.sd.backend.service;

import fpl.sd.backend.dto.response.SizeResponse;
import fpl.sd.backend.entity.SizeChart;
import fpl.sd.backend.repository.SizeChartRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SizeService {

    SizeChartRepository sizeChartRepository;


    public List<SizeResponse> getAllSizes() {
        List<SizeChart> sizes = sizeChartRepository.findAll();
        return sizes.stream()
                .map(size -> {
                    SizeResponse sizeResponse = new SizeResponse();
                    sizeResponse.setId(size.getId());
                    sizeResponse.setSizeNumber(size.getSizeNumber());
                    return sizeResponse;
                }).toList();
    }

}
