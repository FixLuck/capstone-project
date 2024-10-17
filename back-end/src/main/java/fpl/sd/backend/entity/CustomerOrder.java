package fpl.sd.backend.entity;

import fpl.sd.backend.constant.OrderConstants;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    @Column(nullable = false)
    Double originalTotal;

    @Column(nullable = false)
    Instant orderDate;

    @Enumerated(EnumType.STRING)
    OrderConstants.OrderStatus orderStatus;

    @Column(nullable = false)
    Double discountAmount;

    @Column(nullable = false)
    Double finalTotal;

    @ManyToOne
    User user;

    @OneToMany(mappedBy = "order")
    List<OrderDetail> orderDetails = new ArrayList<>();
}
