package com.icx97.theater.controller;

import com.icx97.theater.dto.NewsDto;
import com.icx97.theater.model.News;
import com.icx97.theater.repository.NewsRepository;
import com.icx97.theater.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private static final Logger logger = LoggerFactory.getLogger(NewsController.class);
    private final NewsService newsService;
    private final NewsRepository newsRepository;

    @GetMapping
    public ResponseEntity<List<NewsDto>> getAllNews() {
        logger.info("Received request to get all news");
        return ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsDto> getNewsById(@PathVariable Long id) {
        logger.info("Received request to get news with id {}", id);
        return ResponseEntity.ok(newsService.getNewsById(id));
    }

    public ResponseEntity<String> createNews(
            @RequestParam("newsTitle") String newsTitle,
            @RequestParam("newsDate") String newsDate,
            @RequestParam("newsDescription") String newsDescription,
            @RequestParam(value = "newsImage", required = false) MultipartFile newsImage
    ) throws IOException {
        Date date = Date.valueOf(newsDate);

        NewsDto newsDto = new NewsDto();
        newsDto.setNewsTitle(newsTitle);
        newsDto.setNewsDate(date);
        newsDto.setNewsDescription(newsDescription);
        if (newsImage != null && !newsImage.isEmpty()) {
            newsDto.setNewsImage(newsImage.getBytes());
        }

        return ResponseEntity.ok("Created news");
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsDto> updateNews(@PathVariable Long id, @RequestBody NewsDto newsDto) {
        logger.info("Received request to update news with id {}", id);
        return ResponseEntity.ok(newsService.updateNews(id, newsDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        logger.info("Received request to delete news with id {}", id);
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}