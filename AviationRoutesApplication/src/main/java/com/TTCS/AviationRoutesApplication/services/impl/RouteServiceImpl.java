package com.TTCS.AviationRoutesApplication.services.impl;

import com.TTCS.AviationRoutesApplication.dto.RouteDto;
import com.TTCS.AviationRoutesApplication.dto.request.RouteRequestDto;
import com.TTCS.AviationRoutesApplication.dto.response.RouteResponseDto;
import com.TTCS.AviationRoutesApplication.model.Route;
import com.TTCS.AviationRoutesApplication.repositories.RouteRepository;
import com.TTCS.AviationRoutesApplication.services.RouteService;
import com.TTCS.AviationRoutesApplication.exceptions.RouteNotFoundException;
import com.TTCS.AviationRoutesApplication.mapper.RouteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteServiceImpl implements RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private RouteMapper routeMapper;

    @Override
    public List<RouteDto> getAllRoutes() {
        return routeRepository.findAll().stream()
                .map(routeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public RouteDto getRouteById(Long id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new RouteNotFoundException("Route not found with id: " + id));
        return routeMapper.toDto(route);
    }

    @Override
    public List<RouteDto> getRoutesByOriginAndDestination(String originLocationCode, String destinationLocationCode) {
        return routeRepository.findAll().stream()
                .filter(route -> route.getOriginLocation().getLocationCode().equals(originLocationCode)
                        && route.getDestinationLocation().getLocationCode().equals(destinationLocationCode))
                .map(routeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public RouteDto createRoute(RouteDto routeDto) {
        Route route = routeMapper.toEntity(routeDto);
        Route savedRoute = routeRepository.save(route);
        return routeMapper.toDto(savedRoute);
    }

    @Override
    public RouteDto updateRoute(Long id, RouteDto routeDto) {
        if (!routeRepository.existsById(id)) {
            throw new RouteNotFoundException("Route not found with id: " + id);
        }
        Route updatedRoute = routeMapper.toEntity(routeDto);
        updatedRoute.setId(id);
        Route savedRoute = routeRepository.save(updatedRoute);
        return routeMapper.toDto(savedRoute);
    }

    @Override
    public void deleteRoute(Long id) {
        if (!routeRepository.existsById(id)) {
            throw new RouteNotFoundException("Route not found with id: " + id);
        }
        routeRepository.deleteById(id);
    }

    @Override
    public List<RouteResponseDto> findRoutes(RouteRequestDto requestDto) {
        return routeRepository.findAll().stream()
                .filter(route -> route.getOriginLocation().equals(requestDto.getOriginLocation())
                        && route.getDestinationLocation().equals(requestDto.getDestinationLocation()))
                .map(routeMapper::toResponseDto)
                .collect(Collectors.toList());
    }
} 