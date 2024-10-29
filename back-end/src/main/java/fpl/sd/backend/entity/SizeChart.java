package fpl.sd.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SizeChart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(nullable = false)
    double sizeNumber;

    @OneToMany(mappedBy = "sizeChart", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<ShoeVariant> shoeVariants;
}
