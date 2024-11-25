package fpl.sd.backend.repository;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.response.OrderDetailResponse;
import fpl.sd.backend.dto.response.report.DailyTotalDTO;
import fpl.sd.backend.dto.response.report.MonthlyTotalDTO;
import fpl.sd.backend.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, String> {
    Optional<CustomerOrder> findByIdAndUserIdAndOrderStatus(String orderId, String userId, OrderConstants.OrderStatus orderStatus);

    List<CustomerOrder> findByUserIdOrderByOrderDateDesc(String userId);

    Optional<CustomerOrder> findByIdAndUserId(String orderId, String userId);

    @Query(value = "SELECT DATE(order_date) as order_date, " +
            "SUM(final_total) as daily_total " +
            "FROM customer_order " +
            "WHERE order_status = 'PAID' " +
            "AND (:startDate IS NULL OR order_date >= :startDate) " +
            "AND (:endDate IS NULL OR order_date <= :endDate) " +
            "GROUP BY DATE(order_date) " +
            "ORDER BY DATE(order_date) DESC",
            nativeQuery = true)
    List<Object[]> getDailyTotals(
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate
    );

    @Query(value = "SELECT MONTH(order_date) as month, " +
            "YEAR(order_date) as year, " +
            "SUM(final_total) as monthly_total " +
            "FROM customer_order " +
            "WHERE YEAR(order_date) = :year " +
            "AND order_status = 'PAID' " +
            "GROUP BY MONTH(order_date), YEAR(order_date) " +
            "ORDER BY MONTH(order_date) DESC",
            nativeQuery = true)
    List<Object[]> getMonthlyTotals(@Param("year") int year);


}

