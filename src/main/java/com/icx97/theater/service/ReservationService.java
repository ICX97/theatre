package com.icx97.theater.service;

import com.icx97.theater.dto.ReservationDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.ReservationMapper;
import com.icx97.theater.model.AppUser;
import com.icx97.theater.model.Performance;
import com.icx97.theater.model.Reservation;
import com.icx97.theater.repository.AppUserRepository;
import com.icx97.theater.repository.PerformanceRepository;
import com.icx97.theater.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    public List<ReservationDTO> getAllReservations() {
        logger.info("Fetching all reservations");
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream()
                .map(reservationMapper::reservationToReservationDTO)
                .collect(Collectors.toList());
    }

    public ReservationDTO getReservationById(Long id) {
        logger.info("Fetching reservation with id: {}", id);
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new CustomException("Reservation with id: " + id + " does not exist"));
        return reservationMapper.reservationToReservationDTO(reservation);
    }

    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        logger.info("Creating new reservation: {}", reservationDTO);
        Reservation reservation = reservationMapper.reservationDTOToReservation(reservationDTO);
        Reservation savedReservation = reservationRepository.save(reservation);
        return reservationMapper.reservationToReservationDTO(savedReservation);
    }

    public ReservationDTO updateReservation(Long id, ReservationDTO reservationDTO) {
        logger.info("Updating reservation with id: {}", id);
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new CustomException("Reservation with id: " + id + " does not exist"));

        reservation.setUser(reservationMapper.reservationDTOToReservation(reservationDTO).getUser());
        reservation.setPerformance(reservationMapper.reservationDTOToReservation(reservationDTO).getPerformance());
        reservation.setSeat(reservationMapper.reservationDTOToReservation(reservationDTO).getSeat());
        reservation.setReservationDate(reservationDTO.getReservationDate());

        Reservation updatedReservation = reservationRepository.save(reservation);
        return reservationMapper.reservationToReservationDTO(updatedReservation);
    }

    public void deleteReservation(Long id) {
        logger.info("Deleting reservation with id: {}", id);
        if (!reservationRepository.existsById(id)) {
            throw new CustomException("Reservation with id: " + id + " does not exist");
        }
        reservationRepository.deleteById(id);
    }
}