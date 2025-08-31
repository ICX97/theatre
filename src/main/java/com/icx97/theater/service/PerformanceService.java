package com.icx97.theater.service;

import com.icx97.theater.dto.PerformanceDTO;
import com.icx97.theater.dto.PerformanceTicketPriceDTO;
import com.icx97.theater.dto.PerformanceWithPricesDTO;
import com.icx97.theater.dto.TicketPriceDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.PerformanceMapper;
import com.icx97.theater.model.*;
import com.icx97.theater.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerformanceService {
    private static final Logger logger = LoggerFactory.getLogger(PerformanceService.class);
    private final PerformanceRepository performanceRepository;
    private final HallRepository hallRepository;
    private final PerformanceMapper performanceMapper;
    private final PerformanceTicketPriceRepository performanceTicketPriceRepository;
    private final EnsembleRepository ensembleRepository;
    private final EnsemblePerformanceRepository ensemblePerformanceRepository;

    public List<PerformanceDTO> getAllPerformances() {
        logger.info("Fetching all performances");
        List<Performance> performances = performanceRepository.findAll();
        return performances.stream()
                .map(performanceMapper::performanceToPerformanceDTO)
                .sorted((p1, p2) -> p1.getPerformance_date().compareTo(p2.getPerformance_date())) // Sortiranje po datumu (najranije prvo)
                .collect(Collectors.toList());
    }

    public List<PerformanceWithPricesDTO> getAllPerformancesWithPrices() {
        logger.info("Fetching all performances with ticket prices");
        List<Performance> performances = performanceRepository.findAll();

        return performances.stream().map(performance -> {
            PerformanceWithPricesDTO performanceDTO = new PerformanceWithPricesDTO();
            performanceDTO.setPerformanceId(performance.getPerformanceId());
            performanceDTO.setPerformance_title(performance.getPerformance_title());
            performanceDTO.setPerformance_description(performance.getPerformance_description());
            performanceDTO.setPerformance_date(performance.getPerformance_date());
            performanceDTO.setHallId(performance.getHall().getHallId());
            performanceDTO.setRevenue(performance.getRevenue());
            performanceDTO.setCreated_at(performance.getCreated_at());
            performanceDTO.setUpdated_at(performance.getUpdated_at());
            performanceDTO.setPoster_image(performance.getPoster_image());
            // Pronađi cene karata po predstavi
            List<PerformanceTicketPriceDTO> ticketPrices = performanceTicketPriceRepository.findByPerformance_PerformanceId(performance.getPerformanceId())
                    .stream()
                    .map(ticketPrice -> {
                        PerformanceTicketPriceDTO priceDTO = new PerformanceTicketPriceDTO();
                        priceDTO.setPerformanceTicketPriceId(ticketPrice.getPerformanceTicketPriceId());
                        priceDTO.setPerformanceId(ticketPrice.getPerformance().getPerformanceId());
                        priceDTO.setSeatTypeId(ticketPrice.getSeatType().getSeatTypeId());
                        priceDTO.setPrice(ticketPrice.getPrice());
                        return priceDTO;
                    })
                    .collect(Collectors.toList());

            performanceDTO.setTicketPrices(ticketPrices);
            return performanceDTO;
        })
        .sorted((p1, p2) -> p1.getPerformance_date().compareTo(p2.getPerformance_date())) // Sortiranje po datumu (najranije prvo)
        .collect(Collectors.toList());
    }

    public PerformanceDTO getPerformanceById(Long id) {
        logger.info("Fetching performance with id: {}", id);
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new CustomException("Performance with id: " + id + " does not exist"));
        return performanceMapper.performanceToPerformanceDTO(performance);
    }

    public PerformanceDTO createPerformance(PerformanceDTO performanceDTO) {
        logger.info("Creating new performance: {}", performanceDTO);

        try {
            // Prvo dohvati Hall objekat na osnovu hallId
            Hall hall = hallRepository.findById(performanceDTO.getHallId())
                    .orElseThrow(() -> new CustomException("Hall with id: " + performanceDTO.getHallId() + " does not exist"));

            // Kreiraj Performance objekat
            Performance performance = new Performance();
            performance.setPerformance_title(performanceDTO.getPerformance_title());
            performance.setPerformance_description(performanceDTO.getPerformance_description());
            performance.setPerformance_date(performanceDTO.getPerformance_date());
            performance.setHall(hall);
            performance.setRevenue(performanceDTO.getRevenue());
            performance.setCreated_at(performanceDTO.getCreated_at());
            performance.setUpdated_at(performanceDTO.getUpdated_at());
            
            // Konvertuj poster_image ako je base64 string
            if (performanceDTO.getPoster_image() != null) {
                // Ako je string (base64), konvertuj u byte array
                if (performanceDTO.getPoster_image() instanceof String) {
                    String base64String = (String) performanceDTO.getPoster_image();
                    if (!base64String.isEmpty()) {
                        try {
                            byte[] imageBytes = Base64.getDecoder().decode(base64String);
                            performance.setPoster_image(imageBytes);
                        } catch (IllegalArgumentException e) {
                            logger.warn("Invalid base64 string for poster_image: {}", e.getMessage());
                            performance.setPoster_image(null);
                        }
                    } else {
                        performance.setPoster_image(null);
                    }
                } else if (performanceDTO.getPoster_image() instanceof byte[]) {
                    // Ako je već byte array
                    performance.setPoster_image((byte[]) performanceDTO.getPoster_image());
                } else {
                    logger.warn("Unknown type for poster_image: {}", performanceDTO.getPoster_image().getClass().getName());
                    performance.setPoster_image(null);
                }
            }
            
            performance.setDirector(performanceDTO.getDirector());
            performance.setAdaptation(performanceDTO.getAdaptation());
            performance.setDramaturg(performanceDTO.getDramaturg());
            performance.setScenographer(performanceDTO.getScenographer());
            performance.setCostumeDesigner(performanceDTO.getCostumeDesigner());
            performance.setMusic(performanceDTO.getMusic());
            performance.setStageSpeech(performanceDTO.getStageSpeech());
            performance.setStageManager(performanceDTO.getStageManager());

            logger.info("Saving performance to database...");
            Performance savedPerformance = performanceRepository.save(performance);
            logger.info("Performance saved with ID: {}", savedPerformance.getPerformanceId());

            // Popunjavanje ensemble_performance tabele sa glumcima
            if (performanceDTO.getActors() != null && !performanceDTO.getActors().isEmpty()) {
                logger.info("Adding {} actors to performance", performanceDTO.getActors().size());
                for (Long actorId : performanceDTO.getActors()) {
                    Ensemble ensemble = ensembleRepository.findById(actorId)
                            .orElseThrow(() -> new CustomException("Ensemble with id: " + actorId + " does not exist"));

                    EnsemblePerformance ensemblePerformance = new EnsemblePerformance();
                    ensemblePerformance.setEnsemble(ensemble);
                    ensemblePerformance.setPerformance(savedPerformance);

                    ensemblePerformanceRepository.save(ensemblePerformance);
                    logger.info("Added actor {} to performance", actorId);
                }
            }

            return performanceMapper.performanceToPerformanceDTO(savedPerformance);
        } catch (Exception e) {
            logger.error("Error creating performance: {}", e.getMessage(), e);
            throw new CustomException("Error creating performance: " + e.getMessage());
        }
    }

    public PerformanceDTO updatePerformance(Long id, PerformanceDTO performanceDTO) {
        logger.info("Updating performance with id: {}", id);
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new CustomException("Performance with id: " + id + " does not exist"));
        Hall hall = hallRepository.findById(performanceDTO.getHallId())
                .orElseThrow(() -> new CustomException("Hall with id: " + performanceDTO.getHallId() + " does not exist"));


        performance.setPerformance_title(performanceDTO.getPerformance_title());
        performance.setPerformance_description(performanceDTO.getPerformance_description());
        performance.setPerformance_date(performanceDTO.getPerformance_date());
        performance.setHall(hall);
        performance.setRevenue(performanceDTO.getRevenue());
        performance.setCreated_at(performanceDTO.getCreated_at());
        performance.setUpdated_at(performanceDTO.getUpdated_at());
        
        if (performanceDTO.getPoster_image() != null) {
            if (performanceDTO.getPoster_image() instanceof String) {
                String base64String = (String) performanceDTO.getPoster_image();
                if (!base64String.isEmpty()) {
                    try {
                        byte[] imageBytes = Base64.getDecoder().decode(base64String);
                        performance.setPoster_image(imageBytes);
                    } catch (IllegalArgumentException e) {
                        logger.warn("Invalid base64 string for poster_image: {}", e.getMessage());
                        performance.setPoster_image(null);
                    }
                } else {
                    performance.setPoster_image(null);
                }
            } else if (performanceDTO.getPoster_image() instanceof byte[]) {
                performance.setPoster_image((byte[]) performanceDTO.getPoster_image());
            } else {
                logger.warn("Unknown type for poster_image: {}", performanceDTO.getPoster_image().getClass().getName());
                performance.setPoster_image(null);
            }
        }
        
        performance.setDirector(performanceDTO.getDirector());
        performance.setAdaptation(performanceDTO.getAdaptation());
        performance.setDramaturg(performanceDTO.getDramaturg());
        performance.setScenographer(performanceDTO.getScenographer());
        performance.setCostumeDesigner(performanceDTO.getCostumeDesigner());
        performance.setMusic(performanceDTO.getMusic());
        performance.setStageSpeech(performanceDTO.getStageSpeech());
        performance.setStageManager(performanceDTO.getStageManager());

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