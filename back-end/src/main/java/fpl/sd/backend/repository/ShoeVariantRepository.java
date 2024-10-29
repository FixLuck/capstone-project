package fpl.sd.backend.repository;

import fpl.sd.backend.entity.ShoeVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoeVariantRepository extends JpaRepository<ShoeVariant, String> {
    List<ShoeVariant> findShoeVariantByShoeId(Integer shoeId);
    Optional<ShoeVariant> findShoeVariantBySku(String sku);
    boolean existsBySku(String sku);
}
