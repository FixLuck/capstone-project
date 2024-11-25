package fpl.sd.backend.repository.report;

import fpl.sd.backend.entity.report.InventoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventoryStatusRepository extends JpaRepository<InventoryStatus, String> {

    @Query(nativeQuery = true, value = "select * from inventory_status limit 5")
    List<InventoryStatus> getInventoryStatus();
}
