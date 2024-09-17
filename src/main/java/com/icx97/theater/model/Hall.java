package com.icx97.theater.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_id")
    private Long hallId;

    private String hallName;
    private String hallDescription;
    private Integer numRows;
    private Integer numColumns;
    private Integer totalSeats;
}
