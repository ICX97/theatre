package com.icx97.theater.model;

import com.icx97.theater.enums.SeatTypeName;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "seat_type")
public class SeatType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_type_id")
    private Long seatTypeId;

    @Column(name = "seat_type_name")
    @Enumerated(EnumType.STRING)
    private SeatTypeName seatTypeName;

    @Column(name = "num_rows")
    private Integer numRows;

    @Column(name = "seats_per_row")
    private Integer seatsPerRow;

    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;
}