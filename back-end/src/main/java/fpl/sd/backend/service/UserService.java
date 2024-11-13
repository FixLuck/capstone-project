package fpl.sd.backend.service;


import fpl.sd.backend.dto.request.UserCreateRequest;
import fpl.sd.backend.dto.response.UserResponse;
import fpl.sd.backend.dto.request.UserUpdateRequest;
import fpl.sd.backend.entity.User;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.UserMapper;
import fpl.sd.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    public void validateUserCreateRequest(UserCreateRequest request)  {
        if(userRepository.existsByUsername(request.getUsername())){
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
        if (userRepository.existsByEmail(request.getEmail())){
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
    }
    public UserResponse createUser(UserCreateRequest request){
        validateUserCreateRequest(request);
        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(Instant.now());
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }
    public List<UserResponse> getAllUsers(){
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    public UserResponse getUserById(String id){
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    public UserResponse updateUser(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

    // Kiểm tra xem username đã tồn tại hay chưa
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
    if (request.getPassword() != null) {
        user.setPassword(request.getPassword());
    }
    if (request.getPhone() != null) {
        user.setPhone(request.getPhone());
    }
    if (request.getAddress() != null) {
        user.setAddress(request.getAddress());
    }
    if (request.getActive() != null) {
        user.setActive(request.getActive());
    }

    user.setUpdatedAt(Instant.now());
    userRepository.save(user);
    return userMapper.toUserResponse(user);
}
}
