package fpl.sd.backend.repository;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.response.CartItemResponse;
import fpl.sd.backend.dto.response.OrderDetailResponse;
import fpl.sd.backend.dto.response.report.DailyTotalDTO;
import fpl.sd.backend.dto.response.report.MonthlyTotalDTO;
import fpl.sd.backend.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.Instant;
import fpl.sd.backend.dto.response.OrderDto;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, String> {
    Optional<CustomerOrder> findByIdAndUserIdAndOrderStatus(String orderId, String userId, OrderConstants.OrderStatus orderStatus);

    List<CustomerOrder> findByUserIdOrderByOrderDateDesc(String userId);

    Optional<CustomerOrder> findByIdAndUserId(String orderId, String userId);
    List<CustomerOrder> findByOrderStatus(OrderConstants.OrderStatus orderStatus);
    @Query("""
    SELECT c FROM CustomerOrder c
    WHERE 
     (:orderStatus IS NULL OR c.orderStatus = :orderStatus)

    """)
    Page<CustomerOrder> findCustomerOrderByFilters(
                                  @Param("orderStatus") OrderConstants.OrderStatus orderStatus,

                                  Pageable pageable
    );




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

