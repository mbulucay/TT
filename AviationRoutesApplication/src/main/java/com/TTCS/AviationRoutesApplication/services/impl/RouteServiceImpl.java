package com.TTCS.AviationRoutesApplication.services.impl;

import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;
import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.mapper.LocationMapper;
import com.TTCS.AviationRoutesApplication.mapper.TransportationMapper;
import com.TTCS.AviationRoutesApplication.model.Location;
import com.TTCS.AviationRoutesApplication.model.Transportation;
import com.TTCS.AviationRoutesApplication.repositories.LocationRepository;
import com.TTCS.AviationRoutesApplication.repositories.TransportationRepository;
import com.TTCS.AviationRoutesApplication.services.RouteService;
import com.TTCS.AviationRoutesApplication.enums.DayOfWeek;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashSet;
import java.util.Set;

@Service
public class RouteServiceImpl implements RouteService {

    
    @Autowired
    private LocationMapper locationMapper;
    
    @Autowired
    private TransportationMapper transportationMapper;
    
    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private TransportationRepository transportationRepository;

    @Override
    public List<RouteResponseDto> getRoutesByOriginAndDestination(RouteRequestDto routeRequestDto) {
        List<RouteResponseDto> routes = getRoutesByOriginAndDestination(
            routeRequestDto.getOriginLocation(),
            routeRequestDto.getDestinationLocation()
        );

        if (routeRequestDto.getOperatingDays() != null && !routeRequestDto.getOperatingDays().isEmpty()) {
            routes = routes.stream()
                .filter(route -> {
                    // Rotadaki tüm ulaşım araçlarının çalışma günlerinin kesişimini bul
                    Set<DayOfWeek> commonDays = route.getTransportations().stream()
                        .map(transportation -> new HashSet<>(transportation.getOperatingDays()))
                        .reduce((days1, days2) -> {
                            days1.retainAll(days2); // Kesişim kümesi
                            return days1;
                        })
                        .orElse(new HashSet<>());

                    // İstek günlerinden herhangi biri kesişim kümesinde var mı?
                    return routeRequestDto.getOperatingDays().stream()
                        .anyMatch(commonDays::contains);
                })
                .collect(Collectors.toList());
        }

        return routes;
    }

    @Override
    public List<RouteResponseDto> getRoutesByOriginAndDestination(String originLocationCode, String destinationLocationCode) {
        // Find locations by their codes
        Location originLocation = locationRepository.findByLocationCode(originLocationCode)
            .orElseThrow(() -> new IllegalArgumentException("Origin location not found: " + originLocationCode));
        
        Location destinationLocation = locationRepository.findByLocationCode(destinationLocationCode)
            .orElseThrow(() -> new IllegalArgumentException("Destination location not found: " + destinationLocationCode));
        
        return getRoutesByOriginAndDestination(originLocation.getId(), destinationLocation.getId());
    }

    @Override
    public List<RouteResponseDto> getRoutesByOriginAndDestination(Long originLocationId, Long destinationLocationId) {
        // Get the location entities
        Location originLocation = locationRepository.findById(originLocationId)
            .orElseThrow(() -> new IllegalArgumentException("Origin location not found with ID: " + originLocationId));
        
        Location destinationLocation = locationRepository.findById(destinationLocationId)
            .orElseThrow(() -> new IllegalArgumentException("Destination location not found with ID: " + destinationLocationId));
        
        // Find all possible routes between origin and destination
        List<List<Transportation>> allRoutes = findAllValidRoutes(originLocation, destinationLocation);
        
        // Convert routes to DTOs
        List<RouteResponseDto> routeResponseDtos = new ArrayList<>();
        long routeId = 1;
        
        for (List<Transportation> route : allRoutes) {
            RouteResponseDto routeResponseDto = RouteResponseDto.builder()
                .id(routeId++)
                .originLocation(locationMapper.toDto(originLocation))
                .destinationLocation(locationMapper.toDto(destinationLocation))
                .transportations(route.stream()
                    .map(transportationMapper::toDto)
                    .collect(Collectors.toList()))
                .build();
            
            routeResponseDtos.add(routeResponseDto);
        }
        
        return routeResponseDtos;
    }

    @Override
    public List<RouteResponseDto> findRoutes(RouteRequestDto requestDto) {
        return getRoutesByOriginAndDestination(requestDto);
    }
    
    /**
     * Find all valid routes between origin and destination locations.
     * A valid route must follow these rules:
     * - No more than 3 transportations
     * - Must include exactly one flight
     * - No more than one before-flight transfer
     * - No more than one after-flight transfer
     */
    private List<List<Transportation>> findAllValidRoutes(Location origin, Location destination) {
        List<List<Transportation>> validRoutes = new ArrayList<>();
        
        // Get all flights between any locations
        List<Transportation> allFlights = transportationRepository.findByTransportationType(TransportationType.FLIGHT);
        
        // For each flight, check if we can create a valid route from origin to destination
        for (Transportation flight : allFlights) {
            Location flightOrigin = flight.getOriginLocation();
            Location flightDestination = flight.getDestinationLocation();
            
            // Case 1: Direct flight from origin to destination
            if (flightOrigin.getId().equals(origin.getId()) && flightDestination.getId().equals(destination.getId())) {
                List<Transportation> route = new ArrayList<>();
                route.add(flight);
                validRoutes.add(route);
                continue;
            }
            
            // Case 2: Origin -> Flight -> Destination (need one transfer after flight)
            if (flightOrigin.getId().equals(origin.getId()) && !flightDestination.getId().equals(destination.getId())) {
                List<Transportation> afterFlightTransfers = transportationRepository.findByOriginLocationAndDestinationLocation(
                    flightDestination, destination);
                
                // Filter out flights from after-flight transfers
                afterFlightTransfers = afterFlightTransfers.stream()
                    .filter(transport -> transport.getTransportationType() != TransportationType.FLIGHT)
                    .collect(Collectors.toList());
                
                for (Transportation afterTransfer : afterFlightTransfers) {
                    List<Transportation> route = new ArrayList<>();
                    route.add(flight);
                    route.add(afterTransfer);
                    validRoutes.add(route);
                }
            }
            
            // Case 3: Origin -> Transfer -> Flight -> Destination (need one transfer before flight)
            if (!flightOrigin.getId().equals(origin.getId()) && flightDestination.getId().equals(destination.getId())) {
                List<Transportation> beforeFlightTransfers = transportationRepository.findByOriginLocationAndDestinationLocation(
                    origin, flightOrigin);
                
                // Filter out flights from before-flight transfers
                beforeFlightTransfers = beforeFlightTransfers.stream()
                    .filter(transport -> transport.getTransportationType() != TransportationType.FLIGHT)
                    .collect(Collectors.toList());
                
                for (Transportation beforeTransfer : beforeFlightTransfers) {
                    List<Transportation> route = new ArrayList<>();
                    route.add(beforeTransfer);
                    route.add(flight);
                    validRoutes.add(route);
                }
            }
            
            // Case 4: Origin -> Transfer -> Flight -> Transfer -> Destination
            if (!flightOrigin.getId().equals(origin.getId()) && !flightDestination.getId().equals(destination.getId())) {
                List<Transportation> beforeFlightTransfers = transportationRepository.findByOriginLocationAndDestinationLocation(
                    origin, flightOrigin);
                List<Transportation> afterFlightTransfers = transportationRepository.findByOriginLocationAndDestinationLocation(
                    flightDestination, destination);
                
                // Filter out flights from transfers
                beforeFlightTransfers = beforeFlightTransfers.stream()
                    .filter(transport -> transport.getTransportationType() != TransportationType.FLIGHT)
                    .collect(Collectors.toList());
                
                afterFlightTransfers = afterFlightTransfers.stream()
                    .filter(transport -> transport.getTransportationType() != TransportationType.FLIGHT)
                    .collect(Collectors.toList());
                
                for (Transportation beforeTransfer : beforeFlightTransfers) {
                    for (Transportation afterTransfer : afterFlightTransfers) {
                        List<Transportation> route = new ArrayList<>();
                        route.add(beforeTransfer);
                        route.add(flight);
                        route.add(afterTransfer);
                        validRoutes.add(route);
                    }
                }
            }
        }
        
        return validRoutes;
    }
}
