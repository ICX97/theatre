package com.icx97.theater.mapper;

import com.icx97.theater.dto.PerformanceDTO;
import com.icx97.theater.model.Performance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PerformanceMapper {
    PerformanceMapper INSTANCE = Mappers.getMapper(PerformanceMapper.class);

    @Mapping(source = "hall.hallId", target = "hallId")
    PerformanceDTO performanceToPerformanceDTO(Performance performance);

    @Mapping(source = "hallId", target = "hall.hallId")
    Performance performanceDTOToPerformance(PerformanceDTO performanceDTO);
}