package fpl.sd.backend.service;


import fpl.sd.backend.dto.request.UserCreateRequest;
import fpl.sd.backend.dto.request.UserResponse;
import fpl.sd.backend.dto.request.UserUpdateRequest;
import fpl.sd.backend.entity.User;
import fpl.sd.backend.exception.AppException;
import fpl.sd.backend.exception.ErrorCode;
import fpl.sd.backend.mapper.UserMapper;
import fpl.sd.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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
        User user = userMapper.toUser(request);
        validateUserCreateRequest(request);
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
                .orElseThrow(()-> new RuntimeException("User with id " + id + " not found")));
    }

//    public UserResponse updateUser(String id, UserUpdateRequest request){
//        User user = userRepository.findById(id)
//                .orElseThrow(()-> new RuntimeException("User with id " + id + " not found"));
//
//        if(!request.getUsername().equals(user.getUsername())&&userRepository.existsByUsername(request.getUsername())){
//            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
//        }
//        if(!request.getEmail().equals(user.getEmail())&&userRepository.existsByEmail(request.getEmail())){
//            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
//        }
//        user.setUsername(request.getUsername());
//        user.setEmail(request.getEmail());
//        user.setPassword(request.getPassword());
//        user.setUpdatedAt(Instant.now());
//        user.setPhone(request.getPhone());
//        user.setAddress(request.getAddress());
//        user.setActive(request.getIsActive());
//        userRepository.save(user);
//        return userMapper.toUserResponse(user);
//    }
    public UserResponse updateUser(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

    // Kiểm tra xem username đã tồn tại hay chưa
        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername()) &&
            userRepository.existsByUsername(request.getUsername())) {
                throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
            }

    // Kiểm tra xem email đã tồn tại hay chưa
    if (request.getEmail() != null && !request.getEmail().equals(user.getEmail()) &&
            userRepository.existsByEmail(request.getEmail())) {
        throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
    }

    // Cập nhật thông tin người dùng
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
    if (request.getIsActive() != null) {
        user.setActive(request.getIsActive());
    }

    user.setUpdatedAt(Instant.now());
    userRepository.save(user);
    return userMapper.toUserResponse(user);
}

}
