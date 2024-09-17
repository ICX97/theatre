package com.icx97.theater.model;

import com.icx97.theater.enums.Side;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "seat")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private Long seatId;

    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;

    private String seatNumber;

    @ManyToOne
    @JoinColumn(name = "seat_type_id")
    private SeatType seatType;

    @Enumerated(EnumType.STRING)
    private Side side;  // Define this ENUM for LEFT/RIGHT

    @Column(name = "row_num")
    private Integer rowNum;

    @Column(name = "is_reserved")
    private Boolean isReserved;
}
