package fpl.sd.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShoeVariant {

    public ShoeVariant(Instant createdAt, Instant updatedAt, String sku, int stockQuantity, Shoe shoe, SizeChart sizeChart) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.sku = sku;
        this.stockQuantity = stockQuantity;
        this.shoe = shoe;
        this.sizeChart = sizeChart;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)


    String id;


    @Column(nullable = false)
    Instant createdAt;

    Instant updatedAt;

    @Column(nullable = false, unique = true)
    String sku;

    @Column(nullable = false)
    int stockQuantity;

    @ManyToOne
    Shoe shoe;

    @ManyToOne
    SizeChart sizeChart;

    @OneToMany(mappedBy = "variant")
    List<OrderDetail> orderDetails = new ArrayList<>();
}
