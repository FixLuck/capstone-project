package fpl.sd.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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

    @ManyToOne
    @MapsId("shoeId")
    @JoinColumn(name = "shoe_id", nullable = false)
    private Shoe shoe;

    @Column(nullable = false)
    int quantity;


}
