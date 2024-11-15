package fpl.sd.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class PaymentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long amount;
    String bankCode;
    String transactionNo;
    String paymentDate;
    String cardType;

    @OneToMany(mappedBy = "paymentDetail")
    List<CustomerOrder> orderList;
}
