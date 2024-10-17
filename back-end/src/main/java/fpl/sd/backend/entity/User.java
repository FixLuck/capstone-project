package fpl.sd.backend.entity;

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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String userId;

    @Column(nullable = false)
    String username;

    @Column(nullable = false)
    String password;
    @Column(nullable = false)
    String email;

    @Column(nullable = false)
    String address;

    @Column(nullable = false)
    String phone;

    @Column(nullable = false)
    @Builder.Default
    boolean isActive = true;

    @Column(nullable = false)
    Instant createdAt;


    Instant updatedAt;

    @ManyToOne
    Role role;

}
