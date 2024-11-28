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
public class OrderDetail {
    @EmbeddedId
    OrderDetailId id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "customer_order_id", nullable = false)
    private CustomerOrder order;
//
    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "shoe_variant_id", nullable = false)
    private ShoeVariant variant;

    @Column(nullable = false)
    int quantity;

    @Column(nullable = false)
    double price;


}
