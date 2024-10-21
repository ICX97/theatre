package com.icx97.theater.mapper;

import com.icx97.theater.dto.EnsembleDto;
import com.icx97.theater.model.Ensemble;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EnsembleMapper {
    EnsembleMapper INSTANCE = Mappers.getMapper(EnsembleMapper.class);

    EnsembleDto ensembleToEnsembleDto(Ensemble ensemble);
    Ensemble ensembleDtoToEnsemble(EnsembleDto ensembleDto);
}
