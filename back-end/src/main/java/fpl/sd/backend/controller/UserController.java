package fpl.sd.backend.controller;


import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.request.UserCreateRequest;
<<<<<<< HEAD
import fpl.sd.backend.dto.response.UserResponse;
=======
import fpl.sd.backend.dto.request.UserResponse;
>>>>>>> dat-branch
import fpl.sd.backend.dto.request.UserUpdateRequest;
import fpl.sd.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {
    UserService userService;

    @PostMapping
    public ApiResponse<UserResponse> addUser(@RequestBody @Valid UserCreateRequest user) {
        return ApiResponse.<UserResponse>builder()
                .flag(true)
                .code(200)
                .message("Successfully added user")
                .result(userService.createUser(user))
                .build();
    }

    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .flag(true)
                .code(200)
                .message("Successfully loaded")
                .result(userService.getAllUsers())
                .build();
    }
    @GetMapping("/{userId}")
    public ApiResponse<UserResponse> getUserById(@PathVariable String userId) {
        return ApiResponse.<UserResponse>builder()
                .flag(true)
                .code(200)
                .message("Successfully")
                .result(userService.getUserById(userId))
                .build();
    }

    @PutMapping("/{userId}")
    public ApiResponse<UserResponse> updateUser(@PathVariable String userId, @RequestBody @Valid UserUpdateRequest user) {
        UserResponse updateUser = userService.updateUser(userId,user);
        return ApiResponse.<UserResponse>builder()
                .flag(true)
                .code(200)
                .message("User updated successfully")
                .result(updateUser)
                .build();
    }

}
