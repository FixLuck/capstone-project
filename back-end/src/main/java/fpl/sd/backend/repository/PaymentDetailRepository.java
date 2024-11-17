package fpl.sd.backend.repository;

import fpl.sd.backend.entity.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentDetailRepository extends JpaRepository<PaymentDetail, Long> {
    boolean existsByTransactionNo(String transactionNo);
    Optional<PaymentDetail> findByTransactionNo(String transactionNo);
}
