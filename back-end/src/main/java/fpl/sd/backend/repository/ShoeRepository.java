package fpl.sd.backend.repository;

import fpl.sd.backend.constant.ShoeConstants;
import fpl.sd.backend.entity.Brand;
import fpl.sd.backend.entity.Shoe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoeRepository extends JpaRepository<Shoe, Integer> {
    List<Shoe> findShoesByGender(ShoeConstants.Gender gender);
    List<Shoe> findShoesByBrand(Brand brand);
    List<Shoe> findShoesByCategory(ShoeConstants.Category category);

    List<Shoe> findShoesByNameContainingIgnoreCase(String shoeName);
}
