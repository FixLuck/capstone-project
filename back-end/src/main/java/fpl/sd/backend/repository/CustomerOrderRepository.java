package fpl.sd.backend.repository;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.dto.response.OrderDetailResponse;
import fpl.sd.backend.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, String> {
    Optional<CustomerOrder> findByIdAndUserIdAndOrderStatus(String orderId, String userId, OrderConstants.OrderStatus orderStatus);
    List<CustomerOrder> findByUserId(String userId);
    Optional<CustomerOrder> findByIdAndUserId(String orderId, String userId);
}

