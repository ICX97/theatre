package com.icx97.theater.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Entity
@Table(name = "news", schema = "theatre")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsId;

    @Column(nullable = false, length = 200)
    private String newsTitle;

    @Column
    private Date newsDate;

    @Column(length = 10000)
    private String newsDescription;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] newsImage;

}