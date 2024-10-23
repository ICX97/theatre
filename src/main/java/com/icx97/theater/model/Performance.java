package com.icx97.theater.model;

import jakarta.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "performance")
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "performance_id")
    private Long performanceId;

    @Column(name = "performance_title")
    private String performance_title;

    @Column(name = "performance_description")
    private String performance_description;

    @Column(name = "performance_date")
    private Timestamp performance_date;

    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;

    @Column(name = "revenue")
    private BigDecimal revenue;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp created_at;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Timestamp updated_at;

    @Lob
    @Column(name = "poster_image")
    private byte[] poster_image;

    @Column(name = "director")
    private String director;

    @Column(name = "adaptation")
    private String adaptation;

    @Column(name = "dramaturg")
    private String dramaturg;

    @Column(name = "scenographer")
    private String scenographer;

    @Column(name = "costume_designer")
    private String costumeDesigner;

    @Column(name = "music")
    private String music;

    @Column(name = "stage_speech")
    private String stageSpeech;

    @Column(name = "stage_manager")
    private String stageManager;

    @Column(name = "actors")
    private String actors;

    @OneToMany(mappedBy = "performance", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PerformanceTicketPrice> performanceTicketPrices;
}