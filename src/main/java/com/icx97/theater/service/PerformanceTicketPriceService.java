package com.icx97.theater.service;

import com.icx97.theater.dto.PerformanceTicketPriceDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.PerformanceTicketPriceMapper;
import com.icx97.theater.model.PerformanceTicketPrice;
import com.icx97.theater.repository.PerformanceTicketPriceRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerformanceTicketPriceService {
    private static final Logger logger = LoggerFactory.getLogger(PerformanceTicketPriceService.class);
    private final PerformanceTicketPriceRepository performanceTicketPriceRepository;
    private final PerformanceTicketPriceMapper performanceTicketPriceMapper;

    public List<PerformanceTicketPriceDTO> getAllPerformanceTicketPrices() {
        logger.info("Fetching all performance ticket prices");
        List<PerformanceTicketPrice> performanceTicketPrices = performanceTicketPriceRepository.findAll();
        return performanceTicketPrices.stream()
                .map(performanceTicketPriceMapper::performanceTicketPriceToPerformanceTicketPriceDTO)
                .collect(Collectors.toList());
    }

    public PerformanceTicketPriceDTO getPerformanceTicketPriceById(Long id) {
        logger.info("Fetching performance ticket price with id: {}", id);
        PerformanceTicketPrice performanceTicketPrice = performanceTicketPriceRepository.findById(id)
                .orElseThrow(() -> new CustomException("PerformanceTicketPrice with id: " + id + " does not exist"));
        return performanceTicketPriceMapper.performanceTicketPriceToPerformanceTicketPriceDTO(performanceTicketPrice);
    }

    public PerformanceTicketPriceDTO createPerformanceTicketPrice(PerformanceTicketPriceDTO performanceTicketPriceDTO) {
        logger.info("Creating new performance ticket price: {}", performanceTicketPriceDTO);
        PerformanceTicketPrice performanceTicketPrice = performanceTicketPriceMapper.performanceTicketPriceDTOToPerformanceTicketPrice(performanceTicketPriceDTO);
        PerformanceTicketPrice savedPerformanceTicketPrice = performanceTicketPriceRepository.save(performanceTicketPrice);
        return performanceTicketPriceMapper.performanceTicketPriceToPerformanceTicketPriceDTO(savedPerformanceTicketPrice);
    }

    public PerformanceTicketPriceDTO updatePerformanceTicketPrice(Long id, PerformanceTicketPriceDTO performanceTicketPriceDTO) {
        logger.info("Updating performance ticket price with id: {}", id);
        PerformanceTicketPrice performanceTicketPrice = performanceTicketPriceRepository.findById(id)
                .orElseThrow(() -> new CustomException("PerformanceTicketPrice with id: " + id + " does not exist"));

        performanceTicketPrice.setPrice(performanceTicketPriceDTO.getPrice());

        PerformanceTicketPrice updatedPerformanceTicketPrice = performanceTicketPriceRepository.save(performanceTicketPrice);
        return performanceTicketPriceMapper.performanceTicketPriceToPerformanceTicketPriceDTO(updatedPerformanceTicketPrice);
    }

    public void deletePerformanceTicketPrice(Long id) {
        logger.info("Deleting performance ticket price with id: {}", id);
        if (!performanceTicketPriceRepository.existsById(id)) {
            throw new CustomException("PerformanceTicketPrice with id: " + id + " does not exist");
        }
        performanceTicketPriceRepository.deleteById(id);
    }
}