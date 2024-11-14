package fpl.sd.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

import java.util.ArrayList;
import java.util.List;


import java.util.ArrayList;
import java.util.List;



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
    String id;


    @Column(nullable = false)
    String username;

    @Column(nullable = false)
    String password;
    @Column(nullable = false)
    String email;
    
    String address;
    String phone;

    @Column(nullable = false)
    @Builder.Default
    boolean isActive = true;

    @Column(nullable = false)
    Instant createdAt;


    Instant updatedAt;

    @ManyToOne
    Role role;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    List<CustomerOrder> customerOrders = new ArrayList<>();

}
