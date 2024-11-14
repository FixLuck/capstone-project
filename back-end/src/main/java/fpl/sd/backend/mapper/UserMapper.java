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

    UserResponse toUserResponse(User user);

    @Mapping(source = "active", target = "isActive")
    User toUser(UserUpdateRequest request);

}
