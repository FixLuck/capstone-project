package fpl.sd.backend.service;

import fpl.sd.backend.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class BrandService {
    BrandRepository brandRepository;


}
