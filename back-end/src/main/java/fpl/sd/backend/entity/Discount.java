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

    @Column(nullable = true)
    Double percentage;

    @Column(nullable = false)
    Instant startDate;

    @Column(nullable = false)
    Instant endDate;

    @Column(nullable = false)
    String code;

    @Builder.Default
    Double minimumOrderAmount = 0.0;

    @Column(nullable = false)
    String description;

    @Column(nullable = true)
    Double fixedAmount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    DiscountConstants.DiscountType discountType;

    @Column(nullable = false)
    @Builder.Default
    boolean isActive = true;

    @OneToMany(mappedBy = "discount")
    List<CustomerOrder> customerOrders = new ArrayList<>();

    // Phương thức giúp kiểm tra và điều chỉnh giá trị khi cập nhật Discount
    public void setDiscountValues() {
        if (this.discountType == DiscountConstants.DiscountType.FIXED_AMOUNT) {
            this.percentage = null; // Disable percentage
        } else if (this.discountType == DiscountConstants.DiscountType.PERCENTAGE) {
            this.fixedAmount = null; // Disable fixedAmount
            this.minimumOrderAmount = 0.0; // Disable minimumOrderAmount
        }
    }
}
