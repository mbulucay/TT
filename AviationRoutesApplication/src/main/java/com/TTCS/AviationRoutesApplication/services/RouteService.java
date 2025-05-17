package com.TTCS.AviationRoutesApplication.services;

import java.time.LocalDate;
import java.util.List;

import com.TTCS.AviationRoutesApplication.dto.RouteDto;
import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;

public interface RouteService {
    
    List<RouteDto> getAllRoutes();
    
    RouteDto getRouteById(Long id);
    
    List<RouteDto> getRoutesByOriginAndDestination(
            String originLocationCode, String destinationLocationCode);
    
    List<RouteResponseDto> findRoutes(RouteRequestDto routeRequestDto);
    
    RouteDto createRoute(RouteDto routeDto);
    
    RouteDto updateRoute(Long id, RouteDto routeDto);
    
    void deleteRoute(Long id);
}