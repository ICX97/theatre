package com.icx97.theater.mapper;

import com.icx97.theater.dto.PerformanceDTO;
import com.icx97.theater.model.Performance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PerformanceMapper {
    PerformanceMapper INSTANCE = Mappers.getMapper(PerformanceMapper.class);

    @Mapping(source = "hall.hallId", target = "hallId")
    @Mapping(source = "poster_image", target = "poster_image", qualifiedByName = "byteArrayToObject")
    PerformanceDTO performanceToPerformanceDTO(Performance performance);

    @Mapping(source = "hallId", target = "hall.hallId")
    @Mapping(source = "poster_image", target = "poster_image", qualifiedByName = "objectToByteArray")
    Performance performanceDTOToPerformance(PerformanceDTO performanceDTO);

    @Named("byteArrayToObject")
    default Object byteArrayToObject(byte[] posterImage) {
        return posterImage;
    }

    @Named("objectToByteArray")
    default byte[] objectToByteArray(Object posterImage) {
        if (posterImage instanceof byte[]) {
            return (byte[]) posterImage;
        }
        return null;
    }
}