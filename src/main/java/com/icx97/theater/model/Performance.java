package com.icx97.theater.model;

import jakarta.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "performance")
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "performance_id")
    private Long performanceId;

    @Column(name = "performance_title")
    private String performanceTitle;

    @Column(name = "performance_description")
    private String performanceDescription;

    @Column(name = "performance_date")
    private Timestamp performanceDate;

    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;

    @Column(name = "revenue")
    private BigDecimal revenue;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Timestamp updatedAt;
}