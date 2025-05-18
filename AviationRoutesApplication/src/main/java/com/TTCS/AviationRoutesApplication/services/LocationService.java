package com.TTCS.AviationRoutesApplication.services;

import java.util.List;

import com.TTCS.AviationRoutesApplication.dto.LocationDto;

public interface LocationService {
    List<LocationDto> getAllLocations();
    
    LocationDto getLocationById(Long id);
    
    LocationDto getLocationByCode(String locationCode);
    
    List<LocationDto> getLocationsByCountry(String country);
    
    List<LocationDto> getLocationsByCity(String city);
    
    List<LocationDto> searchLocationsByName(String name);
    
    LocationDto createLocation(LocationDto locationDto);
    
    LocationDto updateLocation(Long id, LocationDto locationDto);
    
    boolean deleteLocation(Long id);
    
    boolean existsByLocationCode(String locationCode);
}