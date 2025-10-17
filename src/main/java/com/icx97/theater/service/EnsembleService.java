package com.icx97.theater.service;

import com.icx97.theater.dto.EnsembleDto;
import com.icx97.theater.mapper.EnsembleMapper;
import com.icx97.theater.model.Ensemble;
import com.icx97.theater.repository.EnsembleRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnsembleService {
    private static final Logger logger = LoggerFactory.getLogger(EnsembleService.class);
    private final EnsembleRepository ensembleRepository;
    private final EnsembleMapper ensembleMapper;

    public List<EnsembleDto> getAllEnsembles() {
        logger.info("Fetching all ensemble members");
        List<Ensemble> ensembles = ensembleRepository.findAll();
        return ensembles.stream()
                .map(ensembleMapper::ensembleToEnsembleDto)
                .collect(Collectors.toList());
    }

    public EnsembleDto getEnsembleById(Long id) {
        logger.info("Fetching ensemble member with id: {}", id);
        Ensemble ensemble = ensembleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ensemble member with id: " + id + " does not exist"));
        return ensembleMapper.ensembleToEnsembleDto(ensemble);
    }

    public EnsembleDto createEnsemble(EnsembleDto ensembleDto) {
        logger.info("Creating new ensemble member: {}", ensembleDto);
        Ensemble ensemble = ensembleMapper.ensembleDtoToEnsemble(ensembleDto);
        Ensemble savedEnsemble = ensembleRepository.save(ensemble);
        return ensembleMapper.ensembleToEnsembleDto(savedEnsemble);
    }

    public EnsembleDto updateEnsemble(Long id, EnsembleDto ensembleDto) {
        logger.info("Updating ensemble member with id: {}", id);
        Ensemble ensemble = ensembleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ensemble member with id: " + id + " does not exist"));

        ensemble.setFirstName(ensembleDto.getFirstName());
        ensemble.setLastName(ensembleDto.getLastName());
        ensemble.setBirthYear(ensembleDto.getBirthYear());
        ensemble.setEnsemble_description(ensembleDto.getEnsemble_description());
        ensemble.setActorImage(ensembleMapper.map(ensembleDto.getActorImage()));

        Ensemble updatedEnsemble = ensembleRepository.save(ensemble);
        return ensembleMapper.ensembleToEnsembleDto(updatedEnsemble);
    }

    public void deleteEnsemble(Long id) {
        logger.info("Deleting ensemble member with id: {}", id);
        if (!ensembleRepository.existsById(id)) {
            throw new RuntimeException("Ensemble member with id: " + id + " does not exist");
        }
        ensembleRepository.deleteById(id);
    }
}

