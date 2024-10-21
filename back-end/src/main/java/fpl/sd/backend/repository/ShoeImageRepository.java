package fpl.sd.backend.repository;

import fpl.sd.backend.entity.ShoeImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoeImageRepository extends JpaRepository<ShoeImage, Integer> {
    List<ShoeImage> findAllByShoeId(Integer shoeId);
    boolean existsByShoeId(Integer shoeId);
}
