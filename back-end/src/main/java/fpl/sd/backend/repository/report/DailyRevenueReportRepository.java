package fpl.sd.backend.repository.report;

import fpl.sd.backend.entity.report.DailyRevenueReport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyRevenueReportRepository extends CrudRepository<DailyRevenueReport, Long> {

    @Query(nativeQuery = true, value = "select * from daily_revenue_report limit 7")
    List<DailyRevenueReport> getDailyRevenueReport();
}
