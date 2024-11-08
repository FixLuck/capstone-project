package fpl.sd.backend.repository;

import fpl.sd.backend.constant.OrderConstants;
import fpl.sd.backend.entity.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, String> {
    CustomerOrder findByUserIdAndOrderStatus(String userId, OrderConstants.OrderStatus orderStatus);
}
