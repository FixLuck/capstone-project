package fpl.sd.backend.repository;

import fpl.sd.backend.entity.OrderDetail;
import fpl.sd.backend.entity.OrderDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailId> {

}
