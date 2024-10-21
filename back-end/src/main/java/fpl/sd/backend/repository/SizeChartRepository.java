package fpl.sd.backend.repository;

import fpl.sd.backend.entity.ShoeVariant;
import fpl.sd.backend.entity.SizeChart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeChartRepository extends JpaRepository<SizeChart, Integer> {
    List<SizeChart> findAllById(Integer id);
}
