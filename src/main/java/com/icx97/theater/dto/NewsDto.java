package com.icx97.theater.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class NewsDto {
    private Long newsId;
    private String newsTitle;
    private Date newsDate;  // Promenjen tip na Date
    private String newsDescription;
    private byte[] newsImage;

}
