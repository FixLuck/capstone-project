package fpl.sd.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import fpl.sd.backend.constant.RoleConstants;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    String id;
    String username;
    String email;
    String address;
    String phone;
    String fullName;
    boolean isActive;
    String createdAt;
    String updatedAt;
    RoleConstants.Role role;
    String roleName;
}
