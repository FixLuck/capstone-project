package fpl.sd.backend.constant;

import fpl.sd.backend.dto.response.EnumResponse;

import java.util.Arrays;
import java.util.List;

public class RoleConstants {
    public enum Role {
        GUEST, MEMBER, MANAGER, ADMIN
    }
    public static RoleConstants.Role getRoleFromString(String roleString) {
        for (RoleConstants.Role role : RoleConstants.Role.values()) {
            if (role.name().equalsIgnoreCase(roleString)) {
                return role;
            }
        }
        return null;
    }
    public static List<EnumResponse> getAllRoleTypeResponses() {
        return Arrays.stream(RoleConstants.Role.values())
                .map(roleString -> new EnumResponse(roleString.name(), roleString.name().toLowerCase()))
                .toList();
    }
}
