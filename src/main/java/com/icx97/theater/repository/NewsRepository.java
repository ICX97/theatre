package com.icx97.theater.repository;

import com.icx97.theater.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}