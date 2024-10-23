package fpl.sd.backend.entity;

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
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false)
    String brandName;

    @Column(nullable = false)
    Instant createdAt;

    String description;

    @Column(nullable = false)
    String logoUrl;


    @Builder.Default
    @Column(nullable = false)
    boolean isActive = true;

    @OneToMany(mappedBy = "brand", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    List<Shoe> shoeList = new ArrayList<>();

    public void addShoe(Shoe shoe) {
        shoe.setBrand(this);
        this.shoeList.add(shoe);
    }

    public int getNumberOfShoes() {
        return this.shoeList.size();
    }

}
