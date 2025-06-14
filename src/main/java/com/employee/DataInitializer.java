package com.employee;

import com.employee.model.ERole;
import com.employee.model.Role;
import com.employee.model.User;
import com.employee.repository.RoleRepository;
import com.employee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@org.springframework.context.annotation.Configuration
public class DataInitializer {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initDefaultUsers(RoleRepository roleRepository, UserRepository userRepository) {
        return args -> {
            // Ensure roles exist
            for (ERole role : ERole.values()) {
                if (!roleRepository.findByName(role).isPresent()) {
                    roleRepository.save(new Role(role));
                }
            }
            // Create admin user if not exists
            Optional<User> adminOpt = userRepository.findByUsername("admin");
            if (!adminOpt.isPresent()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin"));
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
                admin.setRoles(roles);
                userRepository.save(admin);
            }
        };
    }
}
