package com.icx97.theater.service;

import com.icx97.theater.dto.ReservationDTO;
import com.icx97.theater.dto.ResevationListSeatsDTO;
import com.icx97.theater.exception.CustomException;
import com.icx97.theater.mapper.ReservationMapper;
import com.icx97.theater.model.AppUser;
import com.icx97.theater.model.Performance;
import com.icx97.theater.model.Reservation;
import com.icx97.theater.model.Seat;
import com.icx97.theater.repository.AppUserRepository;
import com.icx97.theater.repository.PerformanceRepository;
import com.icx97.theater.repository.ReservationRepository;
import com.icx97.theater.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private final AppUserRepository appUserRepository;
    private final PerformanceRepository performanceRepository;
    private final SeatRepository seatRepository;


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

    public ResevationListSeatsDTO getCombinedReservationsByPerformanceId(Long performanceId) {
        List<Reservation> reservations = reservationRepository.findByPerformance_PerformanceId(performanceId);

        ResevationListSeatsDTO combinedReservation = new ResevationListSeatsDTO();

        if (!reservations.isEmpty()) {
            Reservation firstReservation = reservations.get(0);

            combinedReservation.setReservationId(firstReservation.getReservationId());
            combinedReservation.setUserId(firstReservation.getUser().getUserId());
            combinedReservation.setPerformanceId(firstReservation.getPerformance().getPerformanceId());
            combinedReservation.setReservationDate(firstReservation.getReservationDate());

            combinedReservation.setSeatIds(new ArrayList<>());

            for (Reservation reservation : reservations) {
                combinedReservation.getSeatIds().add(reservation.getSeat().getSeatId());
            }
        } else {
            // Ako nema rezervacija, možemo vratiti DTO sa praznom listom ili baciti izuzetak
            logger.warn("No reservations found for performance ID: {}", performanceId);
        }

        return combinedReservation;
    }

    public List<ReservationDTO> createReservation(ResevationListSeatsDTO reservationListSeatsDTO) {
        List<Reservation> reservations = new ArrayList<>();

        // Preuzmi korisnika i predstavu
        AppUser user = appUserRepository.findById(reservationListSeatsDTO.getUserId())
                .orElseThrow(() -> new CustomException("User  not found"));
        Performance performance = performanceRepository.findById(reservationListSeatsDTO.getPerformanceId())
                .orElseThrow(() -> new CustomException("Performance not found"));

        for (Long seatId : reservationListSeatsDTO.getSeatIds()) {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new CustomException("Seat not found"));

            // Kreiraj novu rezervaciju
            Reservation reservation = new Reservation();
            reservation.setUser(user);
            reservation.setPerformance(performance);
            reservation.setSeat(seat);
            reservation.setReservationDate(reservationListSeatsDTO.getReservationDate());

            reservations.add(reservation);
        }

        // Sačuvaj sve rezervacije
        reservationRepository.saveAll(reservations);

        List<ReservationDTO> reservationDTOs = new ArrayList<>();
        for (Reservation reservation : reservations) {
            ReservationDTO dto = new ReservationDTO();
            dto.setReservationId(reservation.getReservationId());
            dto.setUserId(reservation.getUser().getUserId());
            dto.setPerformanceId(reservation.getPerformance().getPerformanceId());
            dto.setSeatId(reservation.getSeat().getSeatId());
            dto.setReservationDate(reservation.getReservationDate());
            reservationDTOs.add(dto);
        }

        return reservationDTOs;
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