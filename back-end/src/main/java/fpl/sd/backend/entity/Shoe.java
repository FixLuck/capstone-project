package fpl.sd.backend.entity;

import fpl.sd.backend.constant.ShoeConstants;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Shoe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int shoeId;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    double price;

    String description;

    @Builder.Default
    boolean status = true;

    double fakePrice;

    @Column(nullable = false)
    Instant createAt;

    Instant updateAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ShoeConstants.Gender gender;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ShoeConstants.Category category;

    @ManyToOne
    Brand brand;

}
