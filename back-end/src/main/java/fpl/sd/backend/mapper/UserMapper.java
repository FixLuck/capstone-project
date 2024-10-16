package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.request.UserCreateRequest;
import fpl.sd.backend.dto.request.UserResponse;
import fpl.sd.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreateRequest request);

    UserResponse toUserResponse(User user);
}
