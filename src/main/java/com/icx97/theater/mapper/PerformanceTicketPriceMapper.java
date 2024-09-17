package com.icx97.theater.mapper;

import com.icx97.theater.dto.PerformanceTicketPriceDTO;
import com.icx97.theater.model.PerformanceTicketPrice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PerformanceTicketPriceMapper {
    PerformanceTicketPriceMapper INSTANCE = Mappers.getMapper(PerformanceTicketPriceMapper.class);

    PerformanceTicketPriceDTO performanceTicketPriceToPerformanceTicketPriceDTO(PerformanceTicketPrice performanceTicketPrice);

    PerformanceTicketPrice performanceTicketPriceDTOToPerformanceTicketPrice(PerformanceTicketPriceDTO performanceTicketPriceDTO);
}