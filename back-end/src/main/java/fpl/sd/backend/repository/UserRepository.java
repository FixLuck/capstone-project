package fpl.sd.backend.repository;

import fpl.sd.backend.constant.DiscountConstants;
import fpl.sd.backend.entity.Discount;
import fpl.sd.backend.entity.Role;
import fpl.sd.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndOtpCode(String email, String otpCode);

    List<User> findByRole(Role role);
    List<User> findByIsActive(boolean isActive);
    @Query("""
    SELECT u FROM User u
    WHERE 
     (:username IS NULL OR LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%')))
     AND (:isActive IS NULL OR u.isActive = :isActive)
     AND (:roleName IS NULL OR LOWER(u.role.roles) = LOWER(:roleName))  
    """)
    Page<User> findUserByFilters(
            @Param("username") String username,
            @Param("roleName") String roleName,  // Cập nhật tham số là roleName
            @Param("isActive") Boolean isActive,
            Pageable pageable
    );

}
