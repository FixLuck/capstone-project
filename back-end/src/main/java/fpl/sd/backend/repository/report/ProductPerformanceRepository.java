package fpl.sd.backend.repository.report;

import fpl.sd.backend.entity.report.ProductPerformance;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductPerformanceRepository extends CrudRepository<ProductPerformance, String> {

    @Query(nativeQuery = true, value = "select * from product_performance limit 5")
    List<ProductPerformance> getProductPerformance();
}
