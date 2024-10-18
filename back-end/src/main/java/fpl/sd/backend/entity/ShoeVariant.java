package fpl.sd.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShoeVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
<<<<<<< HEAD
    String id;
=======
    String variantId;
>>>>>>> dat-branch

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
}
