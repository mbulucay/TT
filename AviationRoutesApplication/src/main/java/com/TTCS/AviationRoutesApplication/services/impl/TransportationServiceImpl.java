package com.TTCS.AviationRoutesApplication.services.impl;

import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.model.Transportation;
import com.TTCS.AviationRoutesApplication.model.Location;
import com.TTCS.AviationRoutesApplication.repositories.TransportationRepository;
import com.TTCS.AviationRoutesApplication.services.TransportationService;
import com.TTCS.AviationRoutesApplication.exceptions.TransportationNotFoundException;
import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.mapper.TransportationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransportationServiceImpl implements TransportationService {

    @Autowired
    private TransportationRepository transportationRepository;

    @Autowired
    private TransportationMapper transportationMapper;

    @Override
    public List<TransportationDto> getAllTransportations() {
        return transportationRepository.findAll().stream()
                .map(transportationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TransportationDto getTransportationById(Long id) {
        Transportation transportation = transportationRepository.findById(id)
                .orElseThrow(() -> new TransportationNotFoundException("Transportation not found with id: " + id));
        return transportationMapper.toDto(transportation);
    }

    @Override
    public List<TransportationDto> getTransportationsByType(TransportationType type) {
        return transportationRepository.findByType(type).stream()
                .map(transportationMapper::toDto)
                .collect(Collectors.toList());
    }

    // @Override
    // public List<TransportationDto> getTransportationsByOriginAndDestination(
    //         String originLocationCode, String destinationLocationCode){
    //     return transportationRepository.findByOriginLocationCodeAndDestinationLocationCode(originLocationCode, destinationLocationCode).stream()
    //             .map(transportationMapper::toDto)
    //             .collect(Collectors.toList());
    // }

    @Override
    public List<TransportationDto> getTransportationsByOriginAndDestination(
            Location originLocation, Location destinationLocation){
        return transportationRepository.findByOriginLocationAndDestinationLocation(originLocation, destinationLocation).stream()
                .map(transportationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TransportationDto createTransportation(TransportationDto transportationDto) {
        Transportation transportation = transportationMapper.toEntity(transportationDto);
        Transportation savedTransportation = transportationRepository.save(transportation);
        return transportationMapper.toDto(savedTransportation);
    }

    @Override
    public TransportationDto updateTransportation(Long id, TransportationDto transportationDto) {
        if (!transportationRepository.existsById(id)) {
            throw new TransportationNotFoundException("Transportation not found with id: " + id);
        }
        Transportation transportation = transportationMapper.toEntity(transportationDto);
        transportation.setId(id);
        Transportation savedTransportation = transportationRepository.save(transportation);
        return transportationMapper.toDto(savedTransportation);
    }

    @Override
    public void deleteTransportation(Long id) {
        if (!transportationRepository.existsById(id)) {
            throw new TransportationNotFoundException("Transportation not found with id: " + id);
        }
        transportationRepository.deleteById(id);
    }
} 