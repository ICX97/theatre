package com.icx97.theater.service;

import com.icx97.theater.dto.PerformanceDTO;
import com.icx97.theater.dto.PerformanceTicketPriceDTO;
import com.icx97.theater.dto.PerformanceWithPricesDTO;
import com.icx97.theater.dto.TicketPriceDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.PerformanceMapper;
import com.icx97.theater.model.Hall;
import com.icx97.theater.model.Performance;
import com.icx97.theater.model.PerformanceTicketPrice;
import com.icx97.theater.repository.HallRepository;
import com.icx97.theater.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerformanceService {
    private static final Logger logger = LoggerFactory.getLogger(PerformanceService.class);
    private final PerformanceRepository performanceRepository;
    private final HallRepository hallRepository;
    private final PerformanceMapper performanceMapper;

    public List<PerformanceDTO> getAllPerformances() {
        logger.info("Fetching all performances");
        List<Performance> performances = performanceRepository.findAll();
        return performances.stream()
                .map(performanceMapper::performanceToPerformanceDTO)
                .collect(Collectors.toList());
    }

    public List<PerformanceWithPricesDTO> getAllPerformancesWithPrices() {
        logger.info("Fetching all performances with ticket prices");
        List<Performance> performances = performanceRepository.findAll();

        return performances.stream().map(performance -> {
            PerformanceWithPricesDTO performanceDTO = new PerformanceWithPricesDTO();
            performanceDTO.setPerformance_title(performance.getPerformance_title());
            performanceDTO.setPerformance_description(performance.getPerformance_description());
            performanceDTO.setPerformance_date(performance.getPerformance_date());
            performanceDTO.setHallId(performance.getHall().getHallId());

            // Pronađi cene karata po predstavi
            List<PerformanceTicketPriceDTO> ticketPrices = new ArrayList<>();
            List<PerformanceTicketPrice> performanceTicketPrices = performance.getPerformanceTicketPrices(); // Ovo bi trebalo da bude implementirano u Performance entitetu

            for (PerformanceTicketPrice ticketPrice : performanceTicketPrices) {
                PerformanceTicketPriceDTO PerformanceTicketPriceDTO = new PerformanceTicketPriceDTO();
                PerformanceTicketPriceDTO.setSeatTypeId(ticketPrice.getSeatType().getSeatTypeId());
                PerformanceTicketPriceDTO.setPrice(ticketPrice.getPrice());
                ticketPrices.add(PerformanceTicketPriceDTO);
            }

            performanceDTO.setTicketPrices(ticketPrices);
            return performanceDTO;
        }).collect(Collectors.toList());
    }

    public PerformanceDTO getPerformanceById(Long id) {
        logger.info("Fetching performance with id: {}", id);
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new CustomException("Performance with id: " + id + " does not exist"));
        return performanceMapper.performanceToPerformanceDTO(performance);
    }

    public PerformanceDTO createPerformance(PerformanceDTO performanceDTO) {
        logger.info("Creating new performance: {}", performanceDTO);
        Performance performance = performanceMapper.performanceDTOToPerformance(performanceDTO);
        Performance savedPerformance = performanceRepository.save(performance);
        return performanceMapper.performanceToPerformanceDTO(savedPerformance);
    }

    public PerformanceDTO updatePerformance(Long id, PerformanceDTO performanceDTO) {
        logger.info("Updating performance with id: {}", id);
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new CustomException("Performance with id: " + id + " does not exist"));
        Hall hall = hallRepository.findById(performanceDTO.getHallId())
                .orElseThrow(() -> new CustomException("Hall with id: " + performanceDTO.getHallId() + " does not exist"));

        // Postavljanje novih vrednosti
        performance.setPerformance_title(performanceDTO.getPerformance_title());
        performance.setPerformance_description(performanceDTO.getPerformance_description());
        performance.setPerformance_date(performanceDTO.getPerformance_date());
        performance.setHall(hall);
        performance.setRevenue(performanceDTO.getRevenue());
        performance.setCreated_at(performanceDTO.getCreated_at());
        performance.setUpdated_at(performanceDTO.getUpdated_at());
        performance.setPoster_image(performanceDTO.getPoster_image());

        Performance updatedPerformance = performanceRepository.save(performance);
        return performanceMapper.performanceToPerformanceDTO(updatedPerformance);
    }

    public void deletePerformance(Long id) {
        logger.info("Deleting performance with id: {}", id);
        if (!performanceRepository.existsById(id)) {
            throw new CustomException("Performance with id: " + id + " does not exist");
        }
        performanceRepository.deleteById(id);
    }
}