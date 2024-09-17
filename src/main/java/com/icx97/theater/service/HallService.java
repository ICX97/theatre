package com.icx97.theater.service;

import com.icx97.theater.dto.HallDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.HallMapper;
import com.icx97.theater.model.Hall;
import com.icx97.theater.repository.HallRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HallService {
    private static final Logger logger = LoggerFactory.getLogger(HallService.class);
    private final HallRepository hallRepository;
    private final HallMapper hallMapper;

    public List<HallDTO> getAllHalls() {
        logger.info("Fetching all halls");
        List<Hall> halls = hallRepository.findAll();
        return halls.stream()
                .map(hallMapper::hallToHallDTO)
                .collect(Collectors.toList());
    }

    public HallDTO getHallById(Long id) {
        logger.info("Fetching hall with id: {}", id);
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new CustomException("Hall with id: " + id + " does not exist"));
        return hallMapper.hallToHallDTO(hall);
    }

    public HallDTO createHall(HallDTO hallDTO) {
        logger.info("Creating new hall: {}", hallDTO);
        Hall hall = hallMapper.hallDTOToHall(hallDTO);
        Hall savedHall = hallRepository.save(hall);
        return hallMapper.hallToHallDTO(savedHall);
    }

    public HallDTO updateHall(Long id, HallDTO hallDTO) {
        logger.info("Updating hall with id: {}", id);
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new CustomException("Hall with id: " + id + " does not exist"));

        hall.setHallName(hallDTO.getHallName());
        hall.setHallDescription(hallDTO.getHallDescription());
        hall.setNumRows(hallDTO.getNumRows());
        hall.setNumColumns(hallDTO.getNumColumns());
        hall.setTotalSeats(hallDTO.getTotalSeats());

        Hall updatedHall = hallRepository.save(hall);
        return hallMapper.hallToHallDTO(updatedHall);
    }

    public void deleteHall(Long id) {
        logger.info("Deleting hall with id: {}", id);
        if (!hallRepository.existsById(id)) {
            throw new CustomException("Hall with id: " + id + " does not exist");
        }
        hallRepository.deleteById(id);
    }
}