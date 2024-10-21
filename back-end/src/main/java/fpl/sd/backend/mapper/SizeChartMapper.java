package fpl.sd.backend.mapper;

import fpl.sd.backend.dto.response.SizeChartResponse;
import fpl.sd.backend.entity.SizeChart;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface SizeChartMapper {

    SizeChartResponse toSizeChartResponse(SizeChart sizeChart);


}
