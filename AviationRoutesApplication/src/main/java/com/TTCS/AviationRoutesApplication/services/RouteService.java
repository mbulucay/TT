package com.TTCS.AviationRoutesApplication.services;

import java.time.LocalDate;
import java.util.List;

import com.TTCS.AviationRoutesApplication.dto.RouteDto;
import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;

public interface RouteService {

    List<RouteResponseDto> getRoutesByOriginAndDestination(RouteRequestDto routeRequestDto);
    
    List<RouteResponseDto> getRoutesByOriginAndDestination(
            String originLocationCode, String destinationLocationCode);

    List<RouteResponseDto> getRoutesByOriginAndDestination(
            Long originLocationId, Long destinationLocationId);
    
    List<RouteResponseDto> findRoutes(RouteRequestDto routeRequestDto);
    
}