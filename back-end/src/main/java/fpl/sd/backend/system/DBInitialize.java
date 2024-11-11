package fpl.sd.backend.system;

import fpl.sd.backend.constant.RoleConstants;
import fpl.sd.backend.entity.Role;
import fpl.sd.backend.entity.User;
import fpl.sd.backend.repository.RoleRepository;
import fpl.sd.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DBInitialize {

    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        log.info("Initializing DB");
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                Role adminRole = roleRepository.findById(1)
                        .orElseThrow(() -> new RuntimeException("Admin Role not found"));


                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin123"))
                        .createdAt(Instant.now())
                        .email("admin@gmail.com")
                        .address("123 Main St, Springfield")
                        .phone("1234567890")
                        .role(adminRole)
                        .build();

                userRepository.save(user);
                log.warn("Default admin user has been created with password admin123");
            }
        };
    }
}
