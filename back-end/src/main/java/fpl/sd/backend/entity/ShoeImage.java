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
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShoeImage {

    public ShoeImage(String publicId, String url, Instant createdAt, Instant updatedAt, Shoe shoe) {
        this.publicId = publicId;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.shoe = shoe;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false)
    String publicId;

    @Column(nullable = false)
    String url;

    @Column(nullable = false)
    Instant createdAt;

    Instant updatedAt;

    @ManyToOne
    Shoe shoe;



}
