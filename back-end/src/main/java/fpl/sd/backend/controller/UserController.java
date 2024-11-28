package fpl.sd.backend.controller;


import fpl.sd.backend.dto.ApiResponse;
import fpl.sd.backend.dto.PageResponse;
import fpl.sd.backend.dto.request.PasswordChangeRequest;
import fpl.sd.backend.dto.request.UserCreateRequest;
import fpl.sd.backend.dto.response.DiscountResponse;
import fpl.sd.backend.dto.response.ShoeResponse;
import fpl.sd.backend.dto.response.UserResponse;
import fpl.sd.backend.dto.request.UserUpdateRequest;
import fpl.sd.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import fpl.sd.backend.service.AuthenticationService;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "*")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {
    UserService userService;
    AuthenticationService authenticationService;
    
    @PostMapping("/register")
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

    @GetMapping("/profile")
    public ApiResponse<UserResponse> getUserByUsername(@RequestParam(value = "username", required = true) String username) {
        return ApiResponse.<UserResponse>builder()
                .flag(true)
                .code(200)
                .message("Successfully")
                .result(userService.getUserByUserName(username))
                .build();
    }

    @GetMapping("/role")
    public ApiResponse<List<UserResponse>> getUserByRole(@RequestParam(value = "role", required = false) String roleName) {
        return ApiResponse.<List<UserResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(userService.getUserByRole(roleName))  // Cập nhật tham số thành roleName
                .build();
    }

    @GetMapping("/isActive")
    public ApiResponse<List<UserResponse>> getUserByIsActive(@RequestParam(value = "isActive", required = false) boolean isActive) {
        return ApiResponse.<List<UserResponse>>builder()
                .flag(true)
                .code(200)
                .message("OK")
                .result(userService.getUserByIsActive(isActive))
                .build();
    }
    @GetMapping("/list-user")
    public ApiResponse<PageResponse<UserResponse>> getUserPaging(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String roleName,  // Thay roleId bằng roleName
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(defaultValue = "date") String sortOrder,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        return ApiResponse.<PageResponse<UserResponse>>builder()
                .flag(true)
                .message("OK")
                .result(userService.getUserPaging(username, roleName, isActive, page, size, sortOrder))
                .build();
    }


}
