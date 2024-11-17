package fpl.sd.backend.service;


import fpl.sd.backend.constant.RoleConstants;
import fpl.sd.backend.dto.request.UserCreateRequest;
import fpl.sd.backend.dto.response.UserResponse;
import fpl.sd.backend.dto.request.UserUpdateRequest;
import fpl.sd.backend.entity.User;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.UserMapper;
import fpl.sd.backend.repository.RoleRepository;
import fpl.sd.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;

    public void validateUserCreateRequest(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
    }

    public UserResponse createUser(UserCreateRequest request) {
        validateUserCreateRequest(request);
        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(Instant.now());
        user.setAddress("This field need to be updated");
        user.setRole(roleRepository.findById(3)
                .orElseThrow(() -> new AppException(ErrorCode.UNCAUGHT_EXCEPTION)));
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

//    public List<UserResponse> getAllUsers(){
//        List<User> users = userRepository.findAll();
//        return users.stream()
//                .map(userMapper::toUserResponse)
//                .toList();
//    }



    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> {
                    UserResponse response = userMapper.toUserResponse(user);
                    if (user.getRole() != null) {
                        response.setRoleName(user.getRole().getRoles().name());
                    }
                    return response;
                })
                .toList();
    }

    public UserResponse getUserById(String id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    public UserResponse updateUser(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername()) &&
                userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail()) &&
                userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        if (request.getUsername() != null) {
            user.setUsername(request.getUsername());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }
        if (request.getIsActive() != null) {  // Use getIsActive here, which corresponds to the isActive field
            user.setActive(request.getIsActive());
        }

        user.setUpdatedAt(Instant.now());
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }


    public UserResponse getUserByUserName(String username) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            return userMapper.toUserResponse(existingUser.get());
        } else {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
    }


}

