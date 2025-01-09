package com.icx97.theater.service;

import com.icx97.theater.dto.SeatDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.SeatMapper;
import com.icx97.theater.model.Hall;
import com.icx97.theater.model.Performance;
import com.icx97.theater.model.Seat;
import com.icx97.theater.model.SeatType;
import com.icx97.theater.repository.HallRepository;
import com.icx97.theater.repository.PerformanceRepository;
import com.icx97.theater.repository.SeatRepository;
import com.icx97.theater.repository.SeatTypeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeatService {
    private static final Logger logger = LoggerFactory.getLogger(SeatService.class);
    private final SeatRepository seatRepository;
    private final HallRepository hallRepository;
    private final SeatTypeRepository seatTypeRepository;
    private final SeatMapper seatMapper;
    private final PerformanceRepository performanceRepository;

    public List<SeatDTO> getAllSeats() {
        logger.info("Fetching all seats");
        List<Seat> seats = seatRepository.findAll();
        return seats.stream()
                .map(seatMapper::seatToSeatDTO)
                .collect(Collectors.toList());
    }

    public SeatDTO getSeatById(Long id) {
        logger.info("Fetching seat with id: {}", id);
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new CustomException("Seat with id: " + id + " does not exist"));
        return seatMapper.seatToSeatDTO(seat);
    }

    public List<SeatDTO> getSeatsByPerformance(Long performanceId) {
        Performance performance = performanceRepository.findById(performanceId)
                .orElseThrow(() -> new CustomException("Performance not found with id: " + performanceId));

        List<Seat> seats = seatRepository.findByHall_HallId(performance.getHall().getHallId());

        return seats.stream()
                .map(seatMapper::seatToSeatDTO)
                .collect(Collectors.toList());
    }

    public SeatDTO createSeat(SeatDTO seatDTO) {
        logger.info("Creating new seat: {}", seatDTO);
        Seat seat = seatMapper.seatDTOToSeat(seatDTO);
        Seat savedSeat = seatRepository.save(seat);
        return seatMapper.seatToSeatDTO(savedSeat);
    }

    public SeatDTO updateSeat(Long id, SeatDTO seatDTO) {
        logger.info("Updating seat with id: {}", id);
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new CustomException("Seat with id: " + id + " does not exist"));

        seat.setSeatNumber(seatDTO.getSeatNumber());
        seat.setRowNum(seatDTO.getRowNum());
        seat.setIsReserved(seatDTO.getIsReserved());
        Hall hall = hallRepository.findById(seatDTO.getHallId())
                .orElseThrow(() -> new CustomException("Hall with id: " + seatDTO.getHallId() + " does not exist"));
        seat.setHall(hall); // Assuming Hall constructor or setter
        SeatType seatType = seatTypeRepository.findById(seatDTO.getSeatTypeId())
                .orElseThrow(() -> new CustomException("SeatType with id: " + seatDTO.getSeatTypeId() + " does not exist"));
        seat.setSeatType(seatType);

        Seat updatedSeat = seatRepository.save(seat);
        return seatMapper.seatToSeatDTO(updatedSeat);
    }

    public void deleteSeat(Long id) {
        logger.info("Deleting seat with id: {}", id);
        if (!seatRepository.existsById(id)) {
            throw new CustomException("Seat with id: " + id + " does not exist");
        }
        seatRepository.deleteById(id);
    }
}

