package fpl.sd.backend.mapper;


import fpl.sd.backend.dto.request.OrderRequest;
import fpl.sd.backend.dto.request.OrderUpdateRequest;
import fpl.sd.backend.dto.response.OrderDto;
import fpl.sd.backend.dto.response.OrderResponse;
import fpl.sd.backend.entity.CustomerOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    CustomerOrder toCustomerOrder(OrderRequest request);

    @Mapping(source = "id", target = "orderId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.username", target = "username") // Thêm ánh xạ username
    @Mapping(source = "discount.id", target = "discountId")
    OrderResponse toOrderResponse(CustomerOrder order);

    CustomerOrder toCustomerOrder(OrderUpdateRequest request);
}
