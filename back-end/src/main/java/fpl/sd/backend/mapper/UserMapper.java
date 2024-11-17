package fpl.sd.backend.mapper;
import fpl.sd.backend.dto.request.UserCreateRequest;
import fpl.sd.backend.dto.request.UserUpdateRequest;
import fpl.sd.backend.dto.response.UserResponse;
import fpl.sd.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface UserMapper {


    User toUser(UserCreateRequest request);

    @Mapping(target = "roleName", expression = "java(getRoleName(user.getRole()))")
    UserResponse toUserResponse(User user);


    @Mapping(source = "isActive", target = "isActive")
    User toUser(UserUpdateRequest request);



    default String getRoleName(fpl.sd.backend.entity.Role role) {
        if (role != null && role.getRoles() != null) {
            return role.getRoles().name();
        }
        return null;
    }

}
