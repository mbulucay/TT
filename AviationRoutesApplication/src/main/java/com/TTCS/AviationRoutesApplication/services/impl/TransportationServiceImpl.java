package com.TTCS.AviationRoutesApplication.services.impl;

import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.model.Transportation;
import com.TTCS.AviationRoutesApplication.model.Location;
import com.TTCS.AviationRoutesApplication.repositories.TransportationRepository;
import com.TTCS.AviationRoutesApplication.services.TransportationService;
import com.TTCS.AviationRoutesApplication.exceptions.TransportationNotFoundException;
import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.mapper.TransportationMapper;
import com.TTCS.AviationRoutesApplication.enums.DayOfWeek;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
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
        return transportationRepository.findByTransportationType(type).stream()
                .map(transportationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransportationDto> getTransportationsByOriginAndDestination(
            Location originLocation, Location destinationLocation){
        return transportationRepository.findByOriginLocationAndDestinationLocation(originLocation, destinationLocation).stream()
                .map(transportationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TransportationDto createTransportation(TransportationDto transportationDto) {
        System.out.println(transportationDto.getOriginLocation());
        System.out.println(transportationDto.getDestinationLocation());
        System.out.println(transportationDto.getOperatingDays());
        System.out.println(transportationDto.getTransportationType());
        System.out.println(transportationDto.getId());
        
        Transportation transportation = transportationMapper.toEntity(transportationDto);
        System.out.println("lak;skas;lkdas;lkdsa");

        Transportation savedTransportation = transportationRepository.save(transportation);
        System.out.println("lak;skas;lkdas;lkdsa");

        return transportationMapper.toDto(savedTransportation);
    }

    @Override
    public TransportationDto updateTransportation(Long id, TransportationDto transportationDto) {
        Transportation transportation = transportationRepository.findById(id)
            .orElseThrow(() -> new TransportationNotFoundException("Transportation not found with id: " + id));
        
        transportation.setTransportationType(transportationDto.getTransportationType());
        transportation.setOriginLocation(transportationMapper.toEntity(transportationDto).getOriginLocation());
        transportation.setDestinationLocation(transportationMapper.toEntity(transportationDto).getDestinationLocation());
        transportation.setOperatingDaysFromList(transportationDto.getOperatingDays());
        
        Transportation updated = transportationRepository.save(transportation);
        return transportationMapper.toDto(updated);
    }

    @Override
    public void deleteTransportation(Long id) {
        if (!transportationRepository.existsById(id)) {
            throw new TransportationNotFoundException("Transportation not found with id: " + id);
        }
        transportationRepository.deleteById(id);
    }

    public Transportation saveTransportation(Transportation transportation) {
        try {
            return transportationRepository.save(transportation);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("A transportation with these details already exists");
        }
    }

} 