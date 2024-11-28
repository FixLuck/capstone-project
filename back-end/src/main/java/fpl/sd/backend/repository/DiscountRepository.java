package fpl.sd.backend.repository;


import fpl.sd.backend.constant.DiscountConstants;
import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.entity.CustomerOrder;
import fpl.sd.backend.entity.Discount;
import fpl.sd.backend.entity.Shoe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Integer> {
    boolean existsByCode(String code);
    List<Discount> findByDiscountType(DiscountConstants.DiscountType discountType);
    List<Discount> findByIsActive(boolean isActive);
    Optional<Discount> findByCode(String code);
    List<Discount> findDiscountsByCodeContainingIgnoreCase(String discountCode);
//    @Query("""
//    SELECT d FROM Discount d
//    WHERE
//     (:discountType IS NULL OR d.discountType = :discountType)
//     AND (:isActive IS NULL OR d.isActive = :isActive)
//     AND  (:code IS NULL OR LOWER(d.code) LIKE LOWER(CONCAT('%', :code, '%')))
//
//    """)
//    Page<Discount> findDiscountByFilters(
//            @Param("discountType") DiscountConstants.DiscountType discountType,
//            @Param("code") String code,
//            @Param("isActive") boolean isActive,
//            Pageable pageable
//    );
@Query("""
    SELECT d FROM Discount d
    WHERE 
     (:discountType IS NULL OR d.discountType = :discountType)
     AND (:isActive IS NULL OR d.isActive = :isActive)
     AND  (:code IS NULL OR LOWER(d.code) LIKE LOWER(CONCAT('%', :code, '%')))
    """)
Page<Discount> findDiscountByFilters(
        @Param("discountType") DiscountConstants.DiscountType discountType,
        @Param("code") String code,
        @Param("isActive") Boolean isActive,  // Sửa từ boolean thành Boolean
        Pageable pageable
);

}
