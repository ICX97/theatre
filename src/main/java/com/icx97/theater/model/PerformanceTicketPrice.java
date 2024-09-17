package com.icx97.theater.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "performance_ticket_price")
public class PerformanceTicketPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "performance_ticket_price_id")
    private Long performanceTicketPriceId;

    @ManyToOne
    @JoinColumn(name = "performance_id")
    private Performance performance;

    @ManyToOne
    @JoinColumn(name = "seat_type_id")
    private SeatType seatType;

    @Column(name = "price")
    private Double price;
}