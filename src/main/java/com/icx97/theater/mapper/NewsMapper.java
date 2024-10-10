package com.icx97.theater.mapper;

import com.icx97.theater.dto.NewsDto;
import com.icx97.theater.model.News;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NewsMapper {
    NewsMapper INSTANCE = Mappers.getMapper(NewsMapper.class);

    NewsDto newsToNewsDto(News news);
    News newsDtoToNews(NewsDto newsDto);
}