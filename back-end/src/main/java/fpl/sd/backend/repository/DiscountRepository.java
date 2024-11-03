package fpl.sd.backend.repository;


import fpl.sd.backend.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Integer> {
    boolean existsByCode(String code);

    Optional<Discount> findByCode(String code);
}
