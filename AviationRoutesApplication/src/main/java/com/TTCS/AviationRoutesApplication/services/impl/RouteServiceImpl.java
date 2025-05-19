package com.TTCS.AviationRoutesApplication.services.impl;

import com.TTCS.AviationRoutesApplication.dto.LocationDto;
import com.TTCS.AviationRoutesApplication.dto.RouteDto;
import com.TTCS.AviationRoutesApplication.dto.TransportationDto;
import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;
import com.TTCS.AviationRoutesApplication.enums.TransportationType;
import com.TTCS.AviationRoutesApplication.mapper.LocationMapper;
import com.TTCS.AviationRoutesApplication.mapper.RouteMapper;
import com.TTCS.AviationRoutesApplication.mapper.TransportationMapper;
import com.TTCS.AviationRoutesApplication.model.Location;
import com.TTCS.AviationRoutesApplication.model.Transportation;
import com.TTCS.AviationRoutesApplication.repositories.LocationRepository;
import com.TTCS.AviationRoutesApplication.repositories.TransportationRepository;
import com.TTCS.AviationRoutesApplication.services.RouteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteServiceImpl implements RouteService {

    @Autowired
    private RouteMapper routeMapper;
    
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
        return getRoutesByOriginAndDestination(
            routeRequestDto.getOriginLocation(), 
            routeRequestDto.getDestinationLocation()
        );
    }
    
    /**
     * Find routes between origin and destination, optionally filtering by date
     * 
     * @param routeRequestDto The route request containing origin and destination
     * @param date Optional date to filter routes by operating days
     * @return List of valid routes, filtered by date if provided
     */
    public List<RouteResponseDto> getRoutesByOriginAndDestination(RouteRequestDto routeRequestDto, LocalDate date) {
        List<RouteResponseDto> routes = getRoutesByOriginAndDestination(routeRequestDto);
        
        if (date == null) {
            return routes;
        }
        
        // Filter routes based on operating days
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        return routes.stream()
            .filter(route -> isRouteOperatingOnDay(route, dayOfWeek))
            .collect(Collectors.toList());
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
    public RouteDto createRoute(RouteDto routeDto) {
        // This method would be used to create a predefined route
        // Implementation would depend on how routes are stored in the system
        throw new UnsupportedOperationException("Route creation not implemented");
    }

    @Override
    public RouteDto updateRoute(Long id, RouteDto routeDto) {
        // Update a predefined route
        throw new UnsupportedOperationException("Route update not implemented");
    }

    @Override
    public boolean deleteRoute(Long id) {
        // Delete a predefined route
        throw new UnsupportedOperationException("Route deletion not implemented");
    }

    @Override
    public List<RouteResponseDto> findRoutes(RouteRequestDto requestDto) {
        return getRoutesByOriginAndDestination(requestDto);
    }
    
    /**
     * Find routes with an optional date parameter to filter by operating days
     * 
     * @param requestDto The route request containing origin and destination
     * @param date The date to check for transportation availability
     * @return List of valid routes operating on the given date
     */
    public List<RouteResponseDto> findRoutes(RouteRequestDto requestDto, LocalDate date) {
        List<RouteResponseDto> allRoutes = getRoutesByOriginAndDestination(requestDto);
        
        if (date == null) {
            return allRoutes;
        }
        
        // Get day of week (1=Monday, 7=Sunday in Java's DayOfWeek)
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        
        // Filter routes based on operating days
        return allRoutes.stream()
            .filter(route -> isRouteOperatingOnDay(route, dayOfWeek))
            .collect(Collectors.toList());
    }
    
    /**
     * Check if a route is operating on a specific day of the week
     * 
     * @param route The route to check
     * @param dayOfWeek The day of week to check against
     * @return true if all transportations in the route operate on the given day
     */
    private boolean isRouteOperatingOnDay(RouteResponseDto route, DayOfWeek dayOfWeek) {
        // Convert Java DayOfWeek to our custom DayOfWeek enum index
        // Java's DayOfWeek: MONDAY=1, SUNDAY=7
        // Our DayOfWeek: SUNDAY=0, MONDAY=1, ..., SATURDAY=6
        int dayIndex = (dayOfWeek.getValue() % 7); // Convert to 0-based index where 0=SUNDAY
        
        // A route operates on a day if ALL of its transportations operate on that day
        return route.getTransportations().stream()
            .allMatch(transportation -> 
                transportation.getOperatingDays() == null || 
                transportation.getOperatingDays().isEmpty() || 
                transportation.getOperatingDays().stream()
                    .anyMatch(day -> dayToIndex(day) == dayIndex)
            );
    }
    
    /**
     * Convert our DayOfWeek enum to a numeric index
     * 
     * @param day DayOfWeek enum value
     * @return 0-based index where SUNDAY=0, MONDAY=1, etc.
     */
    private int dayToIndex(com.TTCS.AviationRoutesApplication.enums.DayOfWeek day) {
        return switch (day) {
            case SUNDAY -> 0;
            case MONDAY -> 1;
            case TUESDAY -> 2;
            case WEDNESDAY -> 3;
            case THURSDAY -> 4;
            case FRIDAY -> 5;
            case SATURDAY -> 6;
        };
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


























// package com.TTCS.AviationRoutesApplication.services.impl;

// import com.TTCS.AviationRoutesApplication.dto.RouteDto;
// import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
// import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;
// import com.TTCS.AviationRoutesApplication.repositories.TransportationRepository;
// import com.TTCS.AviationRoutesApplication.services.RouteService;
// import com.TTCS.AviationRoutesApplication.mapper.RouteMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class RouteServiceImpl implements RouteService {


//     @Autowired
//     private RouteMapper routeMapper;

//     @Override
//     public List<RouteResponseDto> getRoutesByOriginAndDestination(RouteRequestDto routeRequestDto) {
//         return null;
//     }

//     @Override
//     public List<RouteResponseDto> getRoutesByOriginAndDestination(String originLocationCode, String destinationLocationCode) {
//         return null;
//     }

//     @Override
//     public List<RouteResponseDto> getRoutesByOriginAndDestination(Long originLocationId, Long destinationLocationId){
//         return null;
//     }

//     @Override
//     public RouteDto createRoute(RouteDto routeDto) {
//         return null;
//     }

//     @Override
//     public RouteDto updateRoute(Long id, RouteDto routeDto) {
//         return null;
//     }

//     @Override
//     public boolean deleteRoute(Long id) {
//         return false;
//     }

//     @Override
//     public List<RouteResponseDto> findRoutes(RouteRequestDto requestDto) {
//         return null;
//     }
// } 