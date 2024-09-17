package com.icx97.theater.service;

import com.icx97.theater.dto.SeatTypeDTO;
import com.icx97.theater.enums.SeatTypeName;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.SeatTypeMapper;
import com.icx97.theater.model.Hall;
import com.icx97.theater.model.SeatType;
import com.icx97.theater.repository.HallRepository;
import com.icx97.theater.repository.SeatTypeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeatTypeService {
    private static final Logger logger = LoggerFactory.getLogger(SeatTypeService.class);
    private final SeatTypeRepository seatTypeRepository;
    private final HallRepository hallRepository;
    private final SeatTypeMapper seatTypeMapper;

    public List<SeatTypeDTO> getAllSeatTypes() {
        logger.info("Fetching all seat types");
        List<SeatType> seatTypes = seatTypeRepository.findAll();
        return seatTypes.stream()
                .map(seatTypeMapper::seatTypeToSeatTypeDTO)
                .collect(Collectors.toList());
    }

    public SeatTypeDTO getSeatTypeById(Long id) {
        logger.info("Fetching seat type with id: {}", id);
        SeatType seatType = seatTypeRepository.findById(id)
                .orElseThrow(() -> new CustomException("SeatType with id: " + id + " does not exist"));
        return seatTypeMapper.seatTypeToSeatTypeDTO(seatType);
    }

    public SeatTypeDTO createSeatType(SeatTypeDTO seatTypeDTO) {
        logger.info("Creating new seat type: {}", seatTypeDTO);
        SeatType seatType = seatTypeMapper.seatTypeDTOToSeatType(seatTypeDTO);
        SeatType savedSeatType = seatTypeRepository.save(seatType);
        return seatTypeMapper.seatTypeToSeatTypeDTO(savedSeatType);
    }

    public SeatTypeDTO updateSeatType(Long id, SeatTypeDTO seatTypeDTO) {
        logger.info("Updating seat type with id: {}", id);
        SeatType seatType = seatTypeRepository.findById(id)
                .orElseThrow(() -> new CustomException("SeatType with id: " + id + " does not exist"));
        Hall hall = hallRepository.findById(seatTypeDTO.getHallId())
                .orElseThrow(() -> new CustomException("Hall with id: " + seatTypeDTO.getHallId() + " does not exist"));

        seatType.setHall(hall);
        try {
            seatType.setSeatTypeName(SeatTypeName.valueOf(seatTypeDTO.getSeatTypeName().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new CustomException("Invalid seat type name: " + seatTypeDTO.getSeatTypeName());
        }
        seatType.setNumRows(seatTypeDTO.getNumRows());
        seatType.setSeatsPerRow(seatTypeDTO.getSeatsPerRow());

        SeatType updatedSeatType = seatTypeRepository.save(seatType);
        return seatTypeMapper.seatTypeToSeatTypeDTO(updatedSeatType);
    }

    public void deleteSeatType(Long id) {
        logger.info("Deleting seat type with id: {}", id);
        if (!seatTypeRepository.existsById(id)) {
            throw new CustomException("SeatType with id: " + id + " does not exist");
        }
        seatTypeRepository.deleteById(id);
    }
}