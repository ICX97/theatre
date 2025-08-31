package com.icx97.theater.repository;

import com.icx97.theater.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    
    @Query("SELECT n FROM News n ORDER BY n.newsDate DESC")
    List<News> findAllOrderByNewsDateDesc();
    
    List<News> findAllByOrderByNewsDateDesc();
}