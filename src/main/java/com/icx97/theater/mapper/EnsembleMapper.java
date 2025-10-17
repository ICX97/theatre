package com.icx97.theater.mapper;

import com.icx97.theater.dto.EnsembleDto;
import com.icx97.theater.model.Ensemble;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.Base64;

@Mapper
public interface EnsembleMapper {
    EnsembleMapper INSTANCE = Mappers.getMapper(EnsembleMapper.class);

    EnsembleDto ensembleToEnsembleDto(Ensemble ensemble);
    Ensemble ensembleDtoToEnsemble(EnsembleDto ensembleDto);

    default String map(byte[] value) {
        if (value != null && value.length > 0) {
            return Base64.getEncoder().encodeToString(value);
        }
        return null;
    }

    default byte[] map(String value) {
        if (value != null && !value.isEmpty()) {
            return Base64.getDecoder().decode(value);
        }
        return null;
    }
}
