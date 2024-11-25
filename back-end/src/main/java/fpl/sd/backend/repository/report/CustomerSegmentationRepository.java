package fpl.sd.backend.repository.report;

import fpl.sd.backend.entity.report.CustomerSegmentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerSegmentationRepository extends JpaRepository<CustomerSegmentation, String> {

    @Query(nativeQuery = true, value = "select * from customer_segmentation limit 5")
    List<CustomerSegmentation> getCustomerSegmentation();
}
