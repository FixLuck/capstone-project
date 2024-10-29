package fpl.sd.backend.entity;

import fpl.sd.backend.constant.DiscountConstants;
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
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    Double percentage;

    @Column(nullable = false)
    Instant startDate;

    @Column(nullable = false)
    Instant endDate;

    @Column(nullable = false)
    String code;

    @Column(nullable = false)
    String description;

    Double fixedAmount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    DiscountConstants.DiscountType discountType;

    @Builder.Default
    boolean isActive = true;

    @OneToMany(mappedBy = "discount")
    List<CustomerOrder> customerOrders = new ArrayList<>();
}
