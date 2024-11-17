package fpl.sd.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Fetch;

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

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    CustomerOrder order;
}
