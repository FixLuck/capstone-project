package fpl.sd.backend.entity;

import fpl.sd.backend.constant.ShoeConstants;
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
public class Shoe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    double price;

    String description;

    @Builder.Default
    boolean status = true;

    double fakePrice;

    @Column(nullable = false)
    Instant createdAt;

    Instant updatedAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ShoeConstants.Gender gender;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ShoeConstants.Category category;

    @ManyToOne
    Brand brand;

    @OneToMany(mappedBy = "shoe", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<ShoeImage> shoeImages = new ArrayList<>();

    @OneToMany(mappedBy = "shoe", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<ShoeVariant> shoeVariants = new ArrayList<>();



}
