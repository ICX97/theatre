package com.icx97.theater.service;


import com.icx97.theater.dto.NewsDto;
import com.icx97.theater.mapper.NewsMapper;
import com.icx97.theater.model.News;
import com.icx97.theater.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsService {
    private static final Logger logger = LoggerFactory.getLogger(NewsService.class);
    private final NewsRepository newsRepository;
    private final NewsMapper newsMapper;

    public List<NewsDto> getAllNews() {
        logger.info("Fetching all news");
        List<News> news = newsRepository.findAll();
        return news.stream()
                .map(newsMapper::newsToNewsDto)
                .collect(Collectors.toList());
    }

    public NewsDto getNewsById(Long id) {
        logger.info("Fetching news with id: {}", id);
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News with id: " + id + " does not exist"));
        return newsMapper.newsToNewsDto(news);
    }

    public NewsDto createNews(NewsDto newsDto) {
        logger.info("Creating new news: {}", newsDto);
        News news = newsMapper.newsDtoToNews(newsDto);
        News savedNews = newsRepository.save(news);
        return newsMapper.newsToNewsDto(savedNews);
    }

    public NewsDto updateNews(Long id, NewsDto newsDto) {
        logger.info("Updating news with id: {}", id);
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News with id: " + id + " does not exist"));

        news.setNewsTitle(newsDto.getNewsTitle());
        news.setNewsDate(newsDto.getNewsDate());
        news.setNewsDescription(newsDto.getNewsDescription());
        news.setNewsImage(newsDto.getNewsImage());

        News updatedNews = newsRepository.save(news);
        return newsMapper.newsToNewsDto(updatedNews);
    }

    public void deleteNews(Long id) {
        logger.info("Deleting news with id: {}", id);
        if (!newsRepository.existsById(id)) {
            throw new RuntimeException("News with id: " + id + " does not exist");
        }
        newsRepository.deleteById(id);
    }
}