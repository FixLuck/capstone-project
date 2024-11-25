package fpl.sd.backend.repository;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.entity.CustomerOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, String> {
    Optional<CustomerOrder> findByIdAndUserIdAndOrderStatus(String orderId, String userId, OrderConstants.OrderStatus orderStatus);
    List<CustomerOrder> findByUserId(String userId);
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

}

