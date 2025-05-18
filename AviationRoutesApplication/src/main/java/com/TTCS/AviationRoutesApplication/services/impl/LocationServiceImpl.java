package com.TTCS.AviationRoutesApplication.services.impl;

import com.TTCS.AviationRoutesApplication.dto.LocationDto;
import com.TTCS.AviationRoutesApplication.model.Location;
import com.TTCS.AviationRoutesApplication.repositories.LocationRepository;
import com.TTCS.AviationRoutesApplication.services.LocationService;
import com.TTCS.AviationRoutesApplication.mapper.LocationMapper;
import com.TTCS.AviationRoutesApplication.exceptions.LocationNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private LocationMapper locationMapper;

    @Override
    public List<LocationDto> getAllLocations() {
        return locationRepository.findAll().stream()
                .map(locationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public LocationDto getLocationById(Long id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new LocationNotFoundException("Location not found with id: " + id));
        return locationMapper.toDto(location);
    }

    @Override
    public LocationDto getLocationByCode(String locationCode) {
        Location location = locationRepository.findByLocationCode(locationCode)
                .orElseThrow(() -> new LocationNotFoundException("Location not found with code: " + locationCode));
        return locationMapper.toDto(location);
            }

    @Override
    public List<LocationDto> getLocationsByCountry(String country) {
        return locationRepository.findByCountry(country).stream()
                .map(locationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<LocationDto> getLocationsByCity(String city) {
        return locationRepository.findByCity(city).stream()
                .map(locationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<LocationDto> searchLocationsByName(String name) {
        return locationRepository.findByNameContainingIgnoreCase(name).stream()
                .map(locationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public LocationDto createLocation(LocationDto locationDto) {
        Location location = locationMapper.toEntity(locationDto);
        Location savedLocation = locationRepository.save(location);
        return locationMapper.toDto(savedLocation);
    }

    @Override
    public LocationDto updateLocation(Long id, LocationDto locationDto) {
        if (!locationRepository.existsById(id)) {
            throw new LocationNotFoundException("Location not found with id: " + id);
        }
        Location location = locationMapper.toEntity(locationDto);
        location.setId(id);
        Location savedLocation = locationRepository.save(location);
        return locationMapper.toDto(savedLocation);
    }

    @Override
    public boolean deleteLocation(Long id) {
        if (!locationRepository.existsById(id)) {
            throw new LocationNotFoundException("Location not found with id: " + id);
        }
        locationRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean existsByLocationCode(String locationCode) {
        return locationRepository.existsByLocationCode(locationCode);
    }
} 