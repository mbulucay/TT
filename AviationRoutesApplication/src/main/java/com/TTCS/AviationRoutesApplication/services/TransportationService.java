package com.TTCS.AviationRoutesApplication.services;

import java.util.List;

import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.model.Location;

public interface TransportationService {
    
    List<TransportationDto> getAllTransportations();
    
    TransportationDto getTransportationById(Long id);
    
    List<TransportationDto> getTransportationsByType(TransportationType type);
    
    List<TransportationDto> getTransportationsByOriginAndDestination(
        Location originLocation, Location destinationLocation);
            
    TransportationDto createTransportation(TransportationDto transportationDto);
    
    TransportationDto updateTransportation(Long id, TransportationDto transportationDto);
    
    void deleteTransportation(Long id);
}