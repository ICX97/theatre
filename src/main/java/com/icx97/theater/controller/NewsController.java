package com.icx97.theater.controller;

import com.icx97.theater.dto.NewsDto;
import com.icx97.theater.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private static final Logger logger = LoggerFactory.getLogger(NewsController.class);
    private final NewsService newsService;

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

    @PostMapping
    public ResponseEntity<NewsDto> createNews(@RequestBody NewsDto newsDto) {
        logger.info("Received request to create news: {}", newsDto);
        return ResponseEntity.ok(newsService.createNews(newsDto));
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